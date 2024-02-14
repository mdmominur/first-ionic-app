import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.authCheck();
  }

authCheck(){
  this.ngFireAuth.authState.subscribe((user) => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user') || '{}');
      if(this.isLoggedIn && this.router.url === '/login'){
        this.router.navigate(['/']);
      }
    } else {
      localStorage.setItem('user', null || '{}');
      JSON.parse(localStorage.getItem('user') || '{}');
      if(this.isLoggedIn){
        this.router.navigate(['/login']);
      }
    }
  });
}

  // Login in with email/password
  SignIn(email: any, password: any) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Register user with email/password
  RegisterUser( email: any, password: any) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }
  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser.then((user: any) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['login']);
      });
    });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && Object?.keys(user)?.length !== 0 && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.emailVerified !== false ? true : false;
  }
  get userDetails(): any {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider: any) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user: any, name: any = null) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName:name? name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
