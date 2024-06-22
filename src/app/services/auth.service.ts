import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Add this

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient // Add this
  ) {
    this.authCheck();
  }

  authCheck() {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        user.getIdToken().then(token => {
          this.setToken(token);
        });
        localStorage.setItem('user', JSON.stringify(this.userData));
        if (this.isLoggedIn && this.router.url === '/login') {
          this.router.navigate(['/']);
        }
      } else {
        this.removeToken();
        localStorage.setItem('user', null || '{}');
        if (this.isLoggedIn) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  setToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  removeToken() {
    localStorage.removeItem('jwt_token');
  }

  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  RegisterUser(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user:any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && Object.keys(user).length !== 0 && user.emailVerified !== false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false;
  }

  get userDetails(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  SetUserData(user: any, name: any = null) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: name ? name : user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, { merge: true });
  }

  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.removeToken();
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      location.reload();
    });
  }
}
