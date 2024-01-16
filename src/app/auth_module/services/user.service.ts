import { Injectable } from '@angular/core';
import { Auth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  async resetPassword(email: string): Promise<void>{
    try{
      return sendPasswordResetEmail(this.auth, email);
    }
    catch(error){
      //console.log(error);
    }
  }

  async register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

}
