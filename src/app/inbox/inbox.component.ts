import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  user$: Observable<User>;
  email$: Observable<string>;
  inboxEmails$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.user$ = this.afAuth.authState;
    this.email$ = this.user$.pipe(
      map(
        user => user.email.split('@')[0].concat('@parse.diydashboard.xyz')
      )
    );

    this.inboxEmails$ = this.user$.pipe(
      map(user => `${user.email.split('@')[0].concat('@parse.diydashboard.xyz')}`),
      switchMap((user) => {
        return this.afStore.collection('emails', ref => ref.where('to', '==', user)).snapshotChanges();
      }),
      map(
        snaps => snaps.map(snap => snap.payload.doc).map(doc => ({ id: doc.id, ...(doc.data() as any) }))
      )
    );
  }

}
