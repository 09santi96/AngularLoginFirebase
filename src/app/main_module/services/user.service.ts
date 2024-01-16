import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';

import { Firestore, doc, setDoc, collection, collectionData, query, orderBy, getDoc} from '@angular/fire/firestore';

import { UserInterface } from 'src/app/main_module/components/users/model-user';
import { where } from 'firebase/firestore';
import { ProfilesInterface } from '../components/profiles/model-profiles';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userCollectionRef = collection(this.firestore, 'users');
  private perfilCollectionRef = collection(this.firestore, 'perfiles');

  constructor(private auth: Auth, private firestore: Firestore) {}
  
  async addUsers(newUser: UserInterface): Promise<string> {
    const userDocRef = doc(this.firestore, 'users', newUser.uid);
      try{
        await setDoc(userDocRef, newUser);
        return 'Exito';

      }catch (error) {
        return 'Error '+ error;
      }
  }

  async register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }


  getCurrentUserData() :Observable<UserInterface[]> {
    const user = this.auth.currentUser;
    // get a reference to the user-profile collection
    let queryCurrenteUser = query(this.userCollectionRef, where('uid', '==', user?.uid));
    // get documents (data) from the collection using collectionData
    return collectionData(queryCurrenteUser) as Observable<UserInterface[]>;
  }

  getCurrentPerfilData(perfilId: number) :Observable<ProfilesInterface[]> {
    let queryCurrentePerfil = query(this.perfilCollectionRef, where('id', '==', perfilId));
    return collectionData(queryCurrentePerfil) as Observable<ProfilesInterface[]>;
  }


  /* async resetPassword(email: string): Promise<void>{
    try{
      return sendPasswordResetEmail(this.auth, email);
    }
    catch(error){
      //console.log(error);
    }
  } */


  getUsers(): Observable<UserInterface[]>{
    let queryUsers = query(this.userCollectionRef, orderBy('dateUpdateUser', 'desc'));
    return collectionData(queryUsers, undefined) as Observable<UserInterface[]>;
  }

  getUserById(id :string) :Observable<UserInterface[]> {
    // get a reference to the user-profile collection
    let queryCurrenteUser = query(this.userCollectionRef, where('uid', '==', id));
    // get documents (data) from the collection using collectionData
    return collectionData(queryCurrenteUser) as Observable<UserInterface[]>;
  }

  getVets(): Observable<UserInterface[]>{
    let queryVets = query(this.userCollectionRef, where('perfil', '==', 2));
    return collectionData(queryVets, undefined) as Observable<UserInterface[]>;
  }

}