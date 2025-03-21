import { Routes } from '@angular/router';
import { UploadComponent } from './features/upload/upload.component';
import { ResultsComponent } from './features/results/results.component';
import { SocialsComponent } from './features/socials/socials.component';

export const routes: Routes = [
  { path: '', component: UploadComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'socials', component: SocialsComponent }
];