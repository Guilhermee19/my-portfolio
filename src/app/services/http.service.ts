import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BodyJson {
  [key: string]: unknown;
}

export interface HttpConfig {
  token: boolean;
}

export interface FromObject {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
}

type ApplicationsTypes = 'json' | 'x-www-form-urlencoded';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  public base_url = 'https://iamgui.dev/';
  private repeat = 1;

  private getBodyType(body: BodyJson | HttpParams): ApplicationsTypes {
    return body instanceof HttpParams ? 'x-www-form-urlencoded' : 'json';
  }

  private getUrl(url: string) {
    if (url.includes('http')) return url;
    return this.base_url + url;
  }

  private getHeaders(
    application: ApplicationsTypes = 'json',
    config: HttpConfig
  ) {
    const headers = {
      'Content-Type': `application/${application}`,
      Authorization: '',
    };

    return headers;
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error.detail;
    }

    if (errorMessage === 'User inactive or deleted.') {
    } else if (
      errorMessage !==
        "Cannot resolve keyword 'propertypurpose' into field. Choices are: bedrooms, code, created_at, description, garage_space, id, is_active, is_deleted, main_neighborhood, main_neighborhood_id, maximum_size, minimum_size, neighborhood, propertyorderpurpose, report, search_address, title, type, type_id, updated_at, user, user_id" &&
      errorMessage !==
        "Cannot resolve keyword 'propertyorderpurpose' into field. Choices are: CEP, IPTU, address, address_complement, address_number, annual_iptu_value, bathroom, bedrooms, block, code, concierge, created_at, description, floor, full_address, furnished, garage_space, id, iptu_type, iptu_value, is_active, is_deleted, media, monthly_iptu_value, neighborhood, neighborhood_id, propertypurpose, report, rooms, size, street_name, suite, type, type_id, unity, updated_at, user, user_id"
    ) {
    }

    return throwError(() => error);
  };

  private sanitazerConfig(config?: HttpConfig) {
    if (!config) config = {} as HttpConfig;
    if (typeof config.token !== 'boolean') config.token = true;
    return config;
  }

  /**
   * ### Método GET
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  get<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.sanitazerConfig(config);
    const headers = this.getHeaders('json', config);
    return this.http
      .get<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método POST
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  post<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.sanitazerConfig(config);
    const headers = this.getHeaders(application, config);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .post<T>(this.getUrl(url), _body, {
        headers,
        params,
      })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método PATCH
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição.
   *
   * *O Content-Type será automático com base no tipo de seu body*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param body Corpo da requisição
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  patch<T>(
    url: string,
    body: HttpParams | BodyJson,
    params?: HttpParams,
    config?: HttpConfig
  ) {
    const application = this.getBodyType(body);
    config = this.sanitazerConfig(config);
    const headers = this.getHeaders(application, config);
    const _body = application === 'json' ? JSON.stringify(body) : body;

    return this.http
      .patch<T>(this.getUrl(url), _body, { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }

  /**
   * ### Método DELETE
   * Espera receber um parametro de tipo sendo o tipo de retorno da requisição
   *
   * *O Content-Type é application/json*
   *
   * @param url URL da requisição (a falta do http acarretará na concatenação com o base_url)
   * @param params *opicinal* - Query parametros da requisição (itens depois do **?** na url)
   * @returns Retorna um Observable de sua requisição
   */
  delete<T>(url: string, params?: HttpParams, config?: HttpConfig) {
    config = this.sanitazerConfig(config);
    const headers = this.getHeaders('json', config);

    return this.http
      .delete<T>(this.getUrl(url), { headers, params })
      .pipe(retry(this.repeat), catchError(this.handleError));
  }
}
