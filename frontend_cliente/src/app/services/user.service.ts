import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    this.loading$.next(true);
    return signInWithPopup(this.auth, new GoogleAuthProvider()).finally(() => this.loading$.next(false));
  }

  logout() {
    return signOut(this.auth);
  }


}
