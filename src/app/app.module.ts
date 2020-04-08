import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//injectors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { WithCrededentialsInterceptor } from 'src/interceptors/with-credentials-interceptor';

//components
import { AppComponent } from './app.component';

//routes
import { AppRoutingModule } from './app-routing.module';
import { OutletComponent } from './outlet/outlet.component';

//services
import { authService } from './services/auth.service';




@NgModule({
  declarations: [
    AppComponent,
    OutletComponent
  ],
  imports: [

    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCrededentialsInterceptor,
      multi: true
    },
    authService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
