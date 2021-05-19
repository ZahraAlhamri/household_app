import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingController,NavController  } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public uid;
  public email;
  public name;
  public fname; 
  public lname; 
  public gender; 
  public Dcategory;
  public phone;
  public category;
  public uploadfile: File;
  public filename;
  public uimage = "../../../assets/images/uimage.png";
  public role;
  public address;
  public country;
  url;

  validations_form: FormGroup;
  organization_form: FormGroup;
  donor_form: FormGroup;
  receiver_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loaderToShow: any;
  validation_messages = {
    'fname': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must start with an alphabet'}
    ],
    'lname': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must start with an alphabet'}
    ],
    'phone': [
     { type: 'required', message: 'Phone number is required'},
     { type: 'pattern' , message: 'Enter a valid phone number'},
     { type: 'minlength', message: 'Phone number must be 8 digits'},
     { type: 'maxlength', message: 'Phone number must be 8 digits'}
    ],
     'gender': [
     { type: 'required' , message: 'Gender is required'}
    ],
    'country': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must contain alphabet only'}
    ],
    'address': [
      { type: 'required', message: 'address is required'},
      { type: 'pattern', message: 'Enter a valid Dsecription.' }
    ]
  };
  
  
  constructor(
    private navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    private loader: LoadingController,
    public toastController: ToastController) {}

  ngOnInit() {
    this.category = localStorage.getItem('uType');
    this.uid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    firebase.auth().onAuthStateChanged(user => { //login
      if (user) {   
        firebase //auth
          .firestore() //data
          .doc(`/users/${this.uid}`) //login user
          .onSnapshot(userProfileSnapshot => {
            this.fname = userProfileSnapshot.data().fname
            this.lname= userProfileSnapshot.data().lname;
            this.name = userProfileSnapshot.data().name;
            this.gender = userProfileSnapshot.data().gender;
            this.phone = userProfileSnapshot.data().phone;
            this.role= userProfileSnapshot.data().uType;
            this.uimage= userProfileSnapshot.data().photo;
            this.address= userProfileSnapshot.data().address;
            this.country = userProfileSnapshot.data().country;
            console.log(userProfileSnapshot.data()); 
            localStorage.setItem('uDetails',JSON.stringify(userProfileSnapshot.data()))
            localStorage.setItem('uType',userProfileSnapshot.data().uType);          
          });
      }
    });   
    //firebase.storage().ref().child("uprofilepic/"+this.uid).getDownloadURL().then((url) => { this.uimage = url;})
     
    if(this.category == 'Consumer'){
    this.validations_form = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.+-]+$'),
        Validators.required
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9_.+-]+$'),
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][" "a-zA-Z]*[a-zA-Z]$'),
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][" "a-zA-Z0-9 \n]*[a-zA-Z]$'),
        Validators.required
      ])),
    });
    }
  }
  hideLoader() {
    this.loader.dismiss();
  }
  async UpdatedAlert() {
    const toast = await this.toastController.create({
      message:  " Updated Successfully",
      duration: 4000
    });
    toast.present();
    if(this.role == 'Consumer')
      this.navCtrl.navigateForward('/consumer-home');
    if(this.role == 'Admin')
      this.navCtrl.navigateForward('/admin-home');
  }
  store(){
    if(this.uploadfile){
      const storageRef = firebase.storage().ref();
      storageRef.child(`uprofilepic/${this.uid}`).delete();
      var imageRef = firebase.storage().ref().child(`uprofilepic/${this.uid}`);
      imageRef.put(this.uploadfile).then(
        res=>{
          imageRef.getDownloadURL().then(
            image=>{
              console.log(image);
              firebase
              .firestore()
              .doc(`/users/${this.uid}`).update({
                photo:image
              })
            }
          )
        }
      )
    }
    
  }

  HandleFileSelect(evt){
    if(evt.target.files && evt.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.uimage = event.target.result;
      }
      reader.readAsDataURL(evt.target.files[0]);
    }
      let fileList: FileList = evt.target.files;  
      let file: File = fileList[0];
      console.log(file);
      this.uploadfile = evt.target.files[0];
      this.filename = this.uid;
  }
  showLoader() {
    this.loaderToShow = this.loader.create({
      spinner: 'lines-small',
      cssClass:'custom-loader-class'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  Save() {
    this.showLoader();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {   
        firebase
          .firestore()
          .doc(`/users/${this.uid}`).update({
            fname:this.fname,
            lname:this.lname,
            phone:this.phone,
            gender:this.gender,
            country:this.country,
            address:this.address
          }).then(() => {
            this.store();
            this.hideLoader();
            this.UpdatedAlert();
          },err=>{
            this.hideLoader();
            this.errorMessage = err.message;
          })
      }
    })
  }
 
}