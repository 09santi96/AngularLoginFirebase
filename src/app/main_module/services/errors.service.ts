import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private auth: Auth,
    private firestore: Firestore,
) { }
  errorCollectionRef = collection(this.firestore, 'errors');

  async addError(newError: ErrorInterface): Promise<string> {
    
      try{
        await addDoc(this.errorCollectionRef, newError);
        return 'Error agregado';

      }catch (error) {
        return 'Error '+ error;
      }
  }
}

export interface ErrorInterface {
  descripcionError :string,
  tipo :string,
  dateCreationError :any
}
