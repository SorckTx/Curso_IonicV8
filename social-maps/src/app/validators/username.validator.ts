import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersFacade } from '../facades/users.facade';
import { Observable, map } from 'rxjs';

export class UsernameValidator {
    static usernameExists(controlName: string, usersFacade: UsersFacade): AsyncValidatorFn {
        return (formGroup: AbstractControl): Observable<ValidationErrors | null> => {
            const email = formGroup.get(controlName)?.value;
            return usersFacade.checkUserExists(email).pipe(
                map((result: boolean) => result ? ({ usernameExists: true }) : (null))
            );
        };
    }
}