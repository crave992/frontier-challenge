import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Optionally include core-level services here
// import { SomeService } from './some.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // Register services that should be singletons throughout the app
    // SomeService
  ],
  declarations: []
})
export class CoreModule {
  // Ensure that CoreModule is only imported once (by the AppModule)
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
