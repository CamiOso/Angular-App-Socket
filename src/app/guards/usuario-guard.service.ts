import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';

import { WebsocketService } from '../services/websocket.service';

export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {

    const authService: WebsocketService | undefined = inject(WebsocketService);
    const router: Router | undefined = inject(Router);

    if (authService && authService.getUsuario()) {
        return true;
    } else {
        if (router) {
            router.navigateByUrl('/');
        }
        return false;
    }
}
