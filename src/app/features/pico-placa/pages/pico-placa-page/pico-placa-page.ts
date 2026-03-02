import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PicoPlacaService } from '../../services/pico-placa.service';
import { PicoPlacaResponse, HistorialConsultaRespuesta } from '../../models/pico-placa.model';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-pico-placa-page',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    DatePickerModule,
    ButtonModule,
    DividerModule,
    TagModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    IftaLabelModule,
    InputMaskModule,
  ],
  templateUrl: './pico-placa-page.html'
})
export class PicoPlacaPage {

  private servicio = inject(PicoPlacaService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  resultado = signal<PicoPlacaResponse | null>(null);
  historial = signal<HistorialConsultaRespuesta[]>([]);
  mostrarHistorial = signal(false);
  minDate: Date = new Date();
  form = this.fb.group({
    placa: ['', Validators.required],
    fechaHora: [null as Date | null, Validators.required]
  });

  consultar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Debe completar todos los campos antes de consultar.'
      });

      return;
    }

    const { placa, fechaHora } = this.form.value;
    const placaNormalizada = placa?.toUpperCase().trim();
    const fechaFormateada = (fechaHora as Date)
      .toLocaleString('sv-SE')
      .replace(' ', 'T');

    this.servicio.validar({
      placa: placaNormalizada!,
      fechaHora: fechaFormateada
    }).subscribe({
      next: resp => {
        this.resultado.set(resp);
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();
      },
      error: err => {
        this.manejarError(err);
      }
    });
  }

  cargarHistorial() {
    this.servicio.obtenerHistorial(0, 50)
      .subscribe(resp => {
        this.historial.set(resp.content);
        this.mostrarHistorial.set(true);
      });
  }

  confirmarEliminacion(event: Event, item: HistorialConsultaRespuesta) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Seguro que deseas eliminar la consulta de ${item.placa}?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      acceptLabel: 'Eliminar',
      rejectButtonProps: {
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        severity: 'danger'
      },
      accept: () => {
        this.servicio.eliminarPorId(item.id).subscribe(() => {

          this.historial.update(lista =>
            lista.filter(h => h.id !== item.id)
          );

          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Registro eliminado correctamente'
          });
        });
      }
    });
  }

  private manejarError(error: any) {

    let mensaje = 'Ocurrió un error inesperado';

    // 🔥 Caso 1: errores por campo (objeto dinámico)
    if (error?.error && typeof error.error === 'object') {

      const errores = Object.values(error.error);

      if (errores.length > 0) {
        mensaje = errores.join(' - ');
      }
    }

    // Caso 2: backend devuelve string directo
    else if (typeof error?.error === 'string') {
      mensaje = error.error;
    }

    // Caso 3: error 500
    else if (error?.status >= 500) {
      mensaje = 'Error interno del servidor. Intente más tarde.';
    }

    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: mensaje
    });
  }
}