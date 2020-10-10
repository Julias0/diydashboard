import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afStore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  async loginWithGoogle() {
    const user = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    await this.afStore.doc(`users/${user.user.uid}`).set(user.user.toJSON());
    this.router.navigate(['/', 'app', 'inbox']);
  }

}
