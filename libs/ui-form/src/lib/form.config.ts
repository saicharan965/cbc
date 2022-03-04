import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

export class FormConfig<T> {
    private constructor(
        public formGroup: FormGroup,
        public load: (id: number) => Observable<T>, 
        public create: (value: T) => Observable<unknown>, 
        public update: (value: T) => Observable<unknown>){
        }

    static create<TRef>(config: {
        form: FormGroup,
        load: (id: number) => Observable<TRef>,
        create: (value: TRef) => Observable<any>,
        update: (value: TRef) => Observable<any>,
    }): FormConfig<TRef>{
        debugger;
        return new FormConfig<TRef>(config.form, config.load, config.create, config.update);
    }
}
