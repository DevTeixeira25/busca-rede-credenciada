import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ProviderService } from '../../services/provider';
import { SearchFilters, FilterOptions } from '../../models/provider.model';

@Component({
  selector: 'app-search-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './search-form.html',
  styleUrl: './search-form.scss',
})
export class SearchForm implements OnInit {
  @Output() searchEvent = new EventEmitter<SearchFilters>();
  @Output() providerSelected = new EventEmitter<any>();

  searchForm!: FormGroup;
  filterOptions: FilterOptions = {
    cities: [],
    specialties: [],
    plans: [],
    types: [],
    neighborhoods: []
  };

  loading = false;
  selectedTabIndex = 0;
  showLocationDetails = false;

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadFilterOptions();
    this.setupFieldFlow();
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  get isPlanSelected(): boolean {
    return !!this.searchForm.get('plan')?.value;
  }

  get isLocationDefined(): boolean {
    return !!this.searchForm.get('locationType')?.value;
  }

  get canSearchByTypeOrSpecialty(): boolean {
    // Regra solicitada: ao buscar por especialidade, exige tipo ou especialidade diferente de "Todos"
    if (this.selectedTabIndex === 0) {
      const type = this.searchForm.get('type')?.value;
      const specialty = this.searchForm.get('specialty')?.value;
      return !!type || !!specialty;
    }

    // Na aba Nome, mantém comportamento atual
    return true;
  }

  onLocationTypeChange(event: any) {
    const locationType = event.value;

    if (locationType === 'nearby') {
      this.showLocationDetails = false;
      this.setManualLocationFieldsEnabled(false);
      this.searchForm.patchValue({ state: '', city: '', neighborhood: '' }, { emitEvent: false });
      this.getDeviceGeoLocation();
    } else if (locationType === 'manual') {
      this.showLocationDetails = true;
      this.setManualLocationFieldsEnabled(true);
      this.searchForm.patchValue({ latitude: '', longitude: '', accuracy: '' }, { emitEvent: false });
    } else {
      this.showLocationDetails = false;
      this.setManualLocationFieldsEnabled(false);
      this.searchForm.patchValue(
        { latitude: '', longitude: '', accuracy: '', state: '', city: '', neighborhood: '' },
        { emitEvent: false }
      );
    }

    this.setProviderFieldsEnabled(!!locationType);
    this.searchForm.updateValueAndValidity({ emitEvent: false });
  }

  private getDeviceGeoLocation() {
    if (!navigator.geolocation) {
      alert('Geolocalizacao nao e suportada pelo seu navegador.');
      this.searchForm.get('locationType')?.setValue('');
      this.onLocationTypeChange({ value: '' });
      return;
    }

    this.loading = true;
    const fastOptions = {
      enableHighAccuracy: false,
      timeout: 7000,
      maximumAge: 300000
    };

    const fallbackOptions = {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 0
    };

    this.requestCurrentPosition(fastOptions)
      .catch((error) => {
        if (error.code === error.TIMEOUT) {
          return this.requestCurrentPosition(fallbackOptions);
        }
        throw error;
      })
      .then((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        this.searchForm.patchValue({
          latitude: lat,
          longitude: lng,
          accuracy: accuracy
        });
      })
      .catch((error) => {
        let errorMessage = '';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Voce negou a permissao de localizacao. Ative nas configuracoes do navegador.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informacoes de localizacao nao disponiveis.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Nao foi possivel obter sua localizacao a tempo. Tente novamente ou use localizacao manual.';
            break;
          default:
            errorMessage = 'Erro ao obter localizacao: ' + error.message;
        }

        alert(errorMessage);
        this.searchForm.get('locationType')?.setValue('manual');
        this.onLocationTypeChange({ value: 'manual' });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  private requestCurrentPosition(options: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  private initForm() {
    this.searchForm = this.fb.group(
      {
        name: [{ value: '', disabled: true }],
        plan: ['', Validators.required],
        locationType: [{ value: '', disabled: true }, Validators.required],
        city: [{ value: '', disabled: true }],
        state: [{ value: '', disabled: true }],
        neighborhood: [{ value: '', disabled: true }],
        type: [{ value: '', disabled: true }],
        specialty: [{ value: '', disabled: true }],
        latitude: [''],
        longitude: [''],
        accuracy: ['']
      },
      {
        validators: this.typeOrSpecialtyValidator.bind(this)
      }
    );
  }

  private setupFieldFlow() {
    const planControl = this.searchForm.get('plan');
    const locationTypeControl = this.searchForm.get('locationType');
    const nameControl = this.searchForm.get('name');

    planControl?.valueChanges.subscribe((planValue) => {
      if (planValue) {
        locationTypeControl?.enable({ emitEvent: false });
        nameControl?.enable({ emitEvent: false });
      } else {
        nameControl?.setValue('', { emitEvent: false });
        nameControl?.disable({ emitEvent: false });
        locationTypeControl?.setValue('', { emitEvent: false });
        locationTypeControl?.disable({ emitEvent: false });
        this.onLocationTypeChange({ value: '' });
      }

      this.searchForm.updateValueAndValidity({ emitEvent: false });
    });
  }

  private setProviderFieldsEnabled(enabled: boolean) {
    const typeControl = this.searchForm.get('type');
    const specialtyControl = this.searchForm.get('specialty');

    if (enabled) {
      typeControl?.enable({ emitEvent: false });
      specialtyControl?.enable({ emitEvent: false });
      return;
    }

    typeControl?.setValue('', { emitEvent: false });
    specialtyControl?.setValue('', { emitEvent: false });
    typeControl?.disable({ emitEvent: false });
    specialtyControl?.disable({ emitEvent: false });
  }

  private setManualLocationFieldsEnabled(enabled: boolean) {
    const stateControl = this.searchForm.get('state');
    const cityControl = this.searchForm.get('city');
    const neighborhoodControl = this.searchForm.get('neighborhood');

    if (enabled) {
      stateControl?.enable({ emitEvent: false });
      cityControl?.enable({ emitEvent: false });
      neighborhoodControl?.enable({ emitEvent: false });
      return;
    }

    stateControl?.disable({ emitEvent: false });
    cityControl?.disable({ emitEvent: false });
    neighborhoodControl?.disable({ emitEvent: false });
  }

  private typeOrSpecialtyValidator(form: FormGroup) {
    const type = form.get('type')?.value;
    const specialty = form.get('specialty')?.value;
    const locationType = form.get('locationType')?.value;

    // So valida tipo/especialidade depois de definir localizacao
    if (!locationType) {
      return null;
    }

    if (!type && !specialty) {
      return { typeOrSpecialtyRequired: true };
    }

    // Se for busca manual, exige pelo menos um campo de localizacao detalhada
    if (locationType === 'manual') {
      const city = form.get('city')?.value;
      const state = form.get('state')?.value;
      const neighborhood = form.get('neighborhood')?.value;

      if (!city && !state && !neighborhood) {
        return { locationRequired: true };
      }
    }

    return null;
  }

  private loadFilterOptions() {
    this.providerService.getFilterOptions().subscribe({
      next: (options) => {
        this.filterOptions = options;
      },
      error: (error) => {
        console.error('Erro ao carregar opcoes de filtro:', error);
      }
    });
  }

  formatTypeName(type: string): string {
    const typeMapping: { [key: string]: string } = {
      HOSPITAL: 'Hospital',
      CLINICA: 'Clinica',
      LABORATORIO: 'Laboratorio',
      CONSULTORIO: 'Consultorio',
      MEDICO: 'Medico',
      SERVICO_ESPECIALIZADO: 'Servico Especializado'
    };
    return typeMapping[type] || type;
  }

  onSearch() {
    if (this.searchForm.valid) {
      const filters: SearchFilters = {
        ...this.searchForm.getRawValue(),
        page: 1,
        limit: 10
      };

      this.searchEvent.emit(filters);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.searchForm.controls).forEach((key) => {
      const control = this.searchForm.get(key);
      control?.markAsTouched();
    });
  }

  clearForm() {
    this.searchForm.reset();
    this.searchForm.get('name')?.disable({ emitEvent: false });
    this.searchForm.get('locationType')?.disable({ emitEvent: false });
    this.setManualLocationFieldsEnabled(false);
    this.setProviderFieldsEnabled(false);
    this.showLocationDetails = false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.searchForm.get(fieldName);

    if (field?.hasError('required')) {
      if (fieldName === 'plan') {
        return 'Informe um plano';
      }
      if (fieldName === 'locationType') {
        return 'Informe uma localizacao';
      }
      return `${this.getFieldLabel(fieldName)} e obrigatorio`;
    }

    if (this.searchForm.hasError('typeOrSpecialtyRequired')) {
      return 'Selecione pelo menos Tipo de Prestador ou Especialidade';
    }

    if (this.searchForm.hasError('locationRequired')) {
      return 'Selecione pelo menos Estado, Cidade ou Bairro';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      plan: 'Plano',
      locationType: 'Localizacao',
      city: 'Cidade',
      state: 'Estado',
      neighborhood: 'Bairro',
      type: 'Tipo de Prestador',
      specialty: 'Especialidade'
    };
    return labels[fieldName] || fieldName;
  }
}
