const Validation = (data) =>{
  const errors = {};
  if(Object.keys(data).includes('fname')  && !data.fname){
    errors.fname = 'first name is require...';
  }
  if(Object.keys(data).includes('lname') &&!data.lname){
    errors.lname = 'last name is require...';
  }
  if(Object.keys(data).includes('email') && !data.email){
    errors.email = 'email is require...';
  }
  if(Object.keys(data).includes('email')  && !data.email.includes('@')){
    errors.email = 'invalid email...';
  }
   if(Object.keys(data).includes('password') && !data.password){
    errors.password = 'password is require....'; 
  }
  if(Object.keys(data).includes('address')  &&!data.address){
    errors.address = 'address is require....'; 
  }
  if(Object.keys(data).includes('mobile')  && !data.mobile){
    errors.mobile = 'mobile number is require....'; 
  }
  if(Object.keys(data).includes('payment_method')  && !data.payment_method){
    errors.payment_method = 'payment_method is require....'; 
  }
  if(Object.keys(data).includes('pincode')  && !data.pincode){
    errors.pincode = 'pincode is require....'; 
  }
  if(Object.keys(data).includes('name')  && !data.name){
    errors.name = 'name is require....'; 
  }
  if(Object.keys(data).includes('ingredients')  && !data.ingredients){
    errors.ingredients = 'ingredients is require....'; 
  }
  if(Object.keys(data).includes('price')  && !data.price){
    errors.price = 'price is require....'; 
  }
  if(Object.keys(data).includes('image')  && !data.image){
    errors.image = 'image is require....'; 
  }
  if(Object.keys(data).includes('productID')  && !data.productID){
    errors.productID = 'productID is require....'; 
  }
  
  return errors;
}
export default Validation;