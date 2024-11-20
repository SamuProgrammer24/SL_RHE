import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Asegúrate de importar Router

@Component({
  selector: 'app-formato',
  standalone: true,
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  
  ]
})
export class FormatoComponent implements OnInit {
  reporteForm!: FormGroup;
  notification: string | null = null;  // Variable para las notificaciones

  // Datos de ejemplo para 3 colaboradores
  colaboradoresData = [
    {
      // Información del Colaborador
      id: 'C001',
      primerApellido: 'Pérez',
      segundoApellido: 'García',
      nombre: 'Juan',
      horarioHabitualAM: '08:00',
      horarioHabitualPM: '18:00',
      fechaOcurreAño: 2024,
      fechaOcurreMes: 11,
      fechaOcurreDia: 14,
      horaEntradaAM: '08:00',
      horaEntradaPM: '',
      horaSalidaAM: '',
      horaSalidaPM: '18:00',

      // Tiempo Utilizado
      tiempoUtilizadoAMHasta: '',
      tiempoUtilizadoAMDesde: '',
      tiempoUtilizadoPMHasta: '13:00',
      tiempoUtilizadoPMDesde: '13:30',
      rn: '',
      hedo: '',
      heno: '',
      hefd: '',
      hefn: '',
      fsc: '4',
      fcc: '',
      motivo: 'Reunión',
      formaPagoNomina: '',
      formaPagoTiempo: 'x'
    },
    {
      id: 'C002',
      primerApellido: 'López',
      segundoApellido: 'Sánchez',
      nombre: 'Ana',
      horarioHabitualAM: '07:00',
      horarioHabitualPM: '17:00',
      fechaOcurreAño: 2024,
      fechaOcurreMes: 11,
      fechaOcurreDia: 14,
      horaEntradaAM: '07:30',
      horaEntradaPM: '',
      horaSalidaAM: '',
      horaSalidaPM: '17:30',
      tiempoUtilizadoAMHasta: '',
      tiempoUtilizadoAMDesde: '',
      tiempoUtilizadoPMHasta: '13:00',
      tiempoUtilizadoPMDesde: '13:30',
      rn: '',
      hedo: '',
      heno: '',
      hefd: '',
      hefn: '4',
      fsc: '',
      fcc: '',
      motivo: 'Trabajo adicional',
      formaPagoNomina: 'x',
      formaPagoTiempo: ''
    },
    {
      id: 'C003',
      primerApellido: 'Ramírez',
      segundoApellido: 'Mendoza',
      nombre: 'Carlos',
      horarioHabitualAM: '09:00',
      horarioHabitualPM: '19:00',
      fechaOcurreAño: 2024,
      fechaOcurreMes: 11,
      fechaOcurreDia: 14,
      horaEntradaAM: '09:00',
      horaEntradaPM: '',
      horaSalidaAM: '',
      horaSalidaPM: '19:00',
      tiempoUtilizadoAMHasta: '',
      tiempoUtilizadoAMDesde: '',
      tiempoUtilizadoPMHasta: '13:00',
      tiempoUtilizadoPMDesde: '13:30',
      rn: '',
      hedo: '',
      heno: '',
      hefd: '',
      hefn: '',
      fsc: '',
      fcc: '2',
      motivo: 'Horas extras',
      formaPagoNomina: 'x',
      formaPagoTiempo: ''
    }
  ];

  // Inyección del Router
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Método para inicializar el formulario
  initForm(): void {
    this.reporteForm = this.fb.group({
      fechaReporte: ['', Validators.required],
      centroOperacion: ['', Validators.required],
      centroCosto: ['', Validators.required],
      puntoServicio: ['', Validators.required],
      empleados: this.fb.array([])  // FormArray para los empleados
    });

    this.cargarEmpleados();
  }

  // Obtener el FormArray de empleados
  get empleados(): FormArray {
    return this.reporteForm.get('empleados') as FormArray;
  }

  // Cargar los datos de los empleados en el FormArray
  cargarEmpleados(): void {
    this.colaboradoresData.forEach((colaborador) => {
      this.empleados.push(this.fb.group({
        id: [colaborador.id],
        primerApellido: [colaborador.primerApellido],
        segundoApellido: [colaborador.segundoApellido],
        nombre: [colaborador.nombre],
        horarioHabitualAM: [colaborador.horarioHabitualAM],
        horarioHabitualPM: [colaborador.horarioHabitualPM],
        fechaOcurreAño: [colaborador.fechaOcurreAño],
        fechaOcurreMes: [colaborador.fechaOcurreMes],
        fechaOcurreDia: [colaborador.fechaOcurreDia],
        horaEntradaAM: [colaborador.horaEntradaAM],
        horaEntradaPM: [colaborador.horaEntradaPM],
        horaSalidaAM: [colaborador.horaSalidaAM],
        horaSalidaPM: [colaborador.horaSalidaPM],
        tiempoUtilizadoAMHasta: [colaborador.tiempoUtilizadoAMHasta],
        tiempoUtilizadoAMDesde: [colaborador.tiempoUtilizadoAMDesde],
        tiempoUtilizadoPMHasta: [colaborador.tiempoUtilizadoPMHasta],
        tiempoUtilizadoPMDesde: [colaborador.tiempoUtilizadoPMDesde],
        rn: [colaborador.rn],
        hedo: [colaborador.hedo],
        heno: [colaborador.heno],
        hefd: [colaborador.hefd],
        hefn: [colaborador.hefn],
        fsc: [colaborador.fsc],
        fcc: [colaborador.fcc],
        motivo: [colaborador.motivo],
        formaPagoNomina: [colaborador.formaPagoNomina],
        formaPagoTiempo: [colaborador.formaPagoTiempo],
      }));
    });
  }

  // Función para mostrar la notificación
  showNotification(message: string, isError: boolean = false): void {
    this.notification = message;
    setTimeout(() => {
      this.notification = null;  // La notificación desaparece después de 5 segundos
    }, 5000);
  }

  // Métodos para manejar los botones y mostrar notificaciones
  onGuardar(): void {
    this.showNotification('Se han actualizado y guardado los datos del formulario.');
  }

  onCancelar(): void {
    this.showNotification('Se ha cancelado el actualizado de los datos.');
  }

  // Método para manejar el envío del formulario
onSubmit(): void {
  if (this.reporteForm.valid) {
    console.log(this.reporteForm.value);  // Imprime los datos del formulario
    this.showNotification('Formulario enviado correctamente');

    // Esperar 3 segundos antes de redirigir
    setTimeout(() => {
      this.router.navigate(['/general']);  // Redirige a la ruta '/general' después de 3 segundos
    }, 3000);  // 3000 milisegundos = 3 segundos
  } else {
    console.log('Formulario inválido');
    this.showNotification('Formulario con errores, por favor verifique los campos', true);
  }
}


  // Métodos para manejar la firma (si es necesario en tu formulario)
  previewSignature(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = document.getElementById('signatureImage') as HTMLImageElement;
        img.src = e.target.result;
        img.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  adjustSignature(event: Event): void {
    const input = event.target as HTMLInputElement;
    const img = document.getElementById('signatureImage') as HTMLImageElement;
    img.style.width = `${input.value}%`;
  }
}
