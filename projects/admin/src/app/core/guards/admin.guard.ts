import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


export const adminGuard = ()=>{

  const router = inject(Router);
  const toastr = inject(ToastrService);

  if("token" in localStorage){
    return true;
  }else {
    router.navigate(['/login'])
    
    toastr.info("You should login first !", "info")
    return false;
  }
}
