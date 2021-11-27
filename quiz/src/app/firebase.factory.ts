import { NgZone } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { environment } from '../environments/environment';

export function AngularFireAuthProject1(platformId: Object, zone: NgZone) {
  return new AngularFireAuth(environment.firebaseAuth1, 'firebase-project1-auth', platformId, zone,null,null,null,null,null,null);
}
export function AngularFireAuthProject2(platformId: Object, zone: NgZone) {
    return new AngularFireAuth(environment.firebaseAuth2, 'firebase-project1-auth', platformId, zone,null,null,null,null,null,null);
  }