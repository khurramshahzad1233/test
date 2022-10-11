
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate,  Outlet } from "react-router-dom";

const ProtectedRoute = ({isAdmin}) => {
  const { loading, isAuthenticated,user } = useSelector((state) => state.userred);

  return ( 
    <Fragment>{
     
      loading===false &&(!isAuthenticated?<Navigate to ="/login"/>:isAdmin===true && user.role !=="admin"?<Navigate to="/login"/>:<Outlet/>)}

    </Fragment>
    
       
    
  )
   
  
}
         
export default ProtectedRoute;





      //  {/* loading===false && ( isAuthenticated?<Outlet/>:<Navigate to="/login"/>);
      //  if(isAdmin===true && user.role !=="admin"){

        //  <Navigate to="/login"/>
      //  } */}






// loading===false && ( isAuthenticated?<Outlet/>:<Navigate to="/login"/>);





// import React  from "react";
// import { Navigate, Outlet} from 'react-router-dom'
// import { useSelector } from "react-redux";

//     const ProtectedRoute = () => {

//     const { isAuthenticated, loading } = useSelector(state => state.userred);
    
    

//       return(
//         !loading && ( isAuthenticated?<Outlet/>:<Navigate to="/login"/>)

       
//       )
        

       

      
// };

// export default ProtectedRoute;