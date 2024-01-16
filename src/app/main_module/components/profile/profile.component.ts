import { Observable } from 'rxjs';
import { Firestore, collection, collectionData, query, where} from '@angular/fire/firestore';
import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { UserInterface } from '../users/model-user';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  users$!: Observable<UserInterface[]>;
  _currentUser: any;
  isLoadingResults = true;
  userCollectionRef = collection(this.firestore, 'users');
  hide = true;

  constructor(private auth: Auth,
        private firestore: Firestore = inject(Firestore)) 
  {  }

  ngOnInit(): void {
    this._currentUser = this.auth.currentUser?.uid;
     // get a reference to the user-profile collection
     let queryCurrenteUser = query(this.userCollectionRef, where('uid', '==', this._currentUser));
     // get documents (data) from the collection using collectionData
     this.users$ = collectionData(queryCurrenteUser) as Observable<UserInterface[]>;
  }
  
  ngAfterViewInit(): void{
    this.users$.subscribe({
      next: (rs) => {
        this.isLoadingResults = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })
  }

  SetImgProfile() :void {
    alert("cambio imagen");
  }

}

