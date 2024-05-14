import { HttpErrorResponse } from '@angular/common/http'

export class ConduitErrorResponse extends HttpErrorResponse {
  override error!: {
    errors: Record<string, string[]>
  }
}
