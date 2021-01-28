const AdminController = require('../controller/Admin/admin.controller');
const LocationController = require('../controller/Admin/location.controller');
const ConditionController = require('../controller/Admin/condition.controller');
const SpecializationController = require('../controller/Admin/specialization.controller');
const TimingController = require('../controller/Admin/timing.controller');
const ClinicController = require('../controller/Admin/clinic.controller');
const RoomController = require('../controller/Admin/room.controller');
const ReceptionistController = require('../controller/Admin/receptionist.controller');
const DoctorController = require('../controller/Admin/doctor.controller')
const PatientController = require('../controller/Admin/patient.controller')
const BannerController = require('../controller/Admin/banner.controller')
const ClinicManagerController = require('../controller/Admin/clinic_manager.controller')
const DoctorContactusController = require('../controller/Admin/contact-us.controller');
const ConsultationDetailsController = require('../controller/Admin/consultation_details.controller');
const AppointmentController = require('../controller/Admin/appointment.controller');
const ReviewController = require('../controller/Admin/review.controller');
const FavouriteController = require('../controller/Admin/favourite.controller');
const PrescriptionController = require('../controller/Admin/prescription.controller');
const StaffController = require('../controller/Admin/staff.controller');
// var UserAPI = require('../controller/Admin/user.controller');
const RoleController = require('../controller/Admin/sub_admin_roles.controller');
const preUrl = '/api';
const AboutController = require('../controller/Admin/about_us.controller');
const TermController = require('../controller/Admin/terms_conditions.controller');
const CookieController = require('../controller/Admin/cookie_policy.controller');
const PrivacyController = require('../controller/Admin/privacy_policy.controller');
const RefundController = require('../controller/Admin/refund_policy.controller');
const RemainderController = require('../controller/Admin/remainder.controller');
const PaymentController = require('../controller/Admin/payment.controller');
const VideoController = require('../controller/Admin/video.controller');
const NotificationController = require('../controller/Admin/notification.controller');

exports.routerConfig = (app)=>{
    app.get(preUrl + '/admin',[
        AdminController.getAll
    ]);

    app.put(preUrl + '/admin/:id',[
        AdminController.updateById
    ]);

    // User Login
    // app.use('/userAPI/', UserAPI);

    //--------------------------------

    
    app.get(preUrl + '/location',[
        LocationController.getAll
    ]);

    app.get(preUrl + '/location/:id',[
        LocationController.getById
    ]);

    app.post(preUrl + '/location',[
        LocationController.create
    ]);

    app.post(preUrl + '/getState', [
        LocationController.getState
    ]);

    app.post(preUrl + '/getCity', [
        LocationController.getCity
    ]);

    app.put(preUrl + '/location/:id',[
        LocationController.updateById
    ]);

    app.delete(preUrl + '/location/:id',[
        LocationController.deleteById
    ]);

    //------------------------------------------

    app.get(preUrl + '/condition',[
        ConditionController.getAll
    ]);

    app.get(preUrl + '/condition/:id',[
        ConditionController.getById
    ]);

    app.post(preUrl + '/condition',[
        ConditionController.create
    ]);

    app.put(preUrl + '/condition/:id',[
        ConditionController.updateById
    ]);

    app.delete(preUrl + '/condition/:id',[
        ConditionController.deleteById
    ]);

    //-----------------------------------------------

    app.get(preUrl + '/specialization',[
        SpecializationController.getAll
    ]);

    app.get(preUrl + '/specialization/:id',[
        SpecializationController.getById
    ]);

    app.post(preUrl + '/specialization',[
        SpecializationController.create
    ]);

    app.put(preUrl + '/specialization/:id',[
        SpecializationController.updateById
    ]);

    app.delete(preUrl + '/specialization/:id',[
        SpecializationController.deleteById
    ]);

    app.post(preUrl + '/getDeptName', [
        SpecializationController.getDeptName
    ]);

    //--------------------------------------------

    app.get(preUrl + '/timing',[
        TimingController.getAll
    ]);

    app.get(preUrl + '/timing/:id',[
        TimingController.getById
    ]);

    app.post(preUrl + '/timing',[
        TimingController.create
    ]);

    app.put(preUrl + '/timing/:id',[
        TimingController.updateById
    ]);

    app.delete(preUrl + '/timing/:id',[
        TimingController.deleteById
    ]);

    //------------------------------------------

    app.get(preUrl + '/master/staff',[
        StaffController.getAll
    ]);

    app.get(preUrl + '/master/staff/:id',[
        StaffController.getById
    ]);

    app.post(preUrl + '/master/staff',[
        StaffController.create
    ]);

    app.put(preUrl + '/master/staff/:id',[
        StaffController.updateById
    ]);

    app.delete(preUrl + '/master/staff/:id',[
        StaffController.deleteById
    ]);
    
    app.get(preUrl + '/master/getRoles',[
        StaffController.getRoles
    ]);
    
    app.put(preUrl + '/master/staff/updatePassword/:id', [
        StaffController.updatePassword
    ]);
    
    //------------------------------------------

   

    app.get(preUrl + '/asset',[
        ClinicController.getAll
    ]);

    app.get(preUrl + '/asset/:id',[
        ClinicController.getById
    ]);

    app.post(preUrl + '/asset',[
        ClinicController.create
    ]);

    app.put(preUrl + '/asset/:id',[
        ClinicController.updateById
    ]);

    app.delete(preUrl + '/asset/:id',[
        ClinicController.deleteById
    ]);

    app.post(preUrl + '/assets',[
        ClinicController.getByStatus
    ]);

    app.get(preUrl + '/getClinicsForUser',[
        ClinicController.getAll
    ]);
    
    app.get(preUrl + '/getClinicForUser/:id',[
        ClinicController.getById
    ]);

    app.get(preUrl + '/clinic/getPatientsAddedByClinic/:id',[
        ClinicController.getPatientsAddedByClinic
    ]);

    app.get(preUrl + '/clinic/stateNames',[
        ClinicController.stateNames
    ]);

    app.get(preUrl + '/clinic/cityNames',[
        ClinicController.cityNames
    ]);

    app.get(preUrl + '/clinic/pincodeNames',[
        ClinicController.pincodeNames
    ]);

    app.get(preUrl + '/getRegisteredClinic', [
        ClinicController.getRegisteredClinic
    ])

    app.post(preUrl + '/assignClinicManager', [
        ClinicController.assignClinicManager
    ]);


    //-------------------------------------------

    app.get(preUrl + '/getNear',[
        RoomController.getNear
    ]);

    app.get(preUrl + '/room',[
        RoomController.getAll
    ]);

    app.get(preUrl + '/rooms/:id',[
        RoomController.getAllRoom
    ]);


    app.get(preUrl + '/room/:id',[
        RoomController.getById
    ]);

    app.get(preUrl + '/getRoomById/:id',[
        RoomController.getRoomById
    ]);

    app.post(preUrl + '/room',[
        RoomController.create
    ]);

    app.post(preUrl + '/addRoom',[
        RoomController.createRoom
    ]);

    app.post(preUrl + '/editRoom',[
        RoomController.editRoom
    ]);

    app.put(preUrl + '/room/:id',[
        RoomController.updateById
    ]);

    app.delete(preUrl + '/room/:id',[
        RoomController.deleteById
    ]);

    app.post(preUrl + '/assignRoomToDoctor', [
        RoomController.assignRoomToDoctor
    ]);

    app.post(preUrl + '/getMyClinic', [
        RoomController.getMyClinic
    ]);

    app.get(preUrl + '/clinic/getDoctorsOfClinic/:id',[
        RoomController.getDoctorsOfClinic
    ]);

    app.get(preUrl + '/clinic/getDoctorOfClinic/:id',[
        RoomController.getDoctorOfClinic
    ]);
    
    app.put(preUrl + '/updDocPaidStatus/:id',[
        RoomController.updateById
    ]);

    app.put(preUrl + '/room/updateAvailability/:id',[
        RoomController.updateAvailability
    ]);

    app.get(preUrl + '/room/search/:state/:city/:pincode',[
        RoomController.search
    ]);
    
    app.get(preUrl + '/room/getDoctorForUser/:id',[
        RoomController.getById
    ]);
    app.get(preUrl + '/room/RoomsOfClinic/:id',[
        RoomController.RoomsOfClinic
    ]);

    app.get(preUrl + '/searchDocsBySpec',[
        RoomController.searchDocsBySpec
    ]);

    

    //-----------------------------------------------

    app.get(preUrl + '/receptionist',[
        ReceptionistController.getAll
    ]);

    app.get(preUrl + '/receptionist/:id',[
        ReceptionistController.getById
    ]);

    app.post(preUrl + '/receptionist',[
        ReceptionistController.create
    ]);

    app.put(preUrl + '/receptionist/:id',[
        ReceptionistController.updateById
    ]);

    app.delete(preUrl + '/receptionist/:id',[
        ReceptionistController.deleteById
    ]);

    //---------------------------------------------

    app.get(preUrl + '/doctor',[
        DoctorController.getAll
    ]);

    app.get(preUrl + '/doctor/:id',[
        DoctorController.getById
    ]);

    app.post(preUrl + '/doctor',[
        DoctorController.create
    ]);
    app.post(preUrl + '/addDoctor',[
        DoctorController.addDoctor
    ]);

    app.post(preUrl + '/doctorSignIn',[
        DoctorController.signIn
    ]);
    app.post(preUrl + '/doctorDetails',[
        DoctorController.doctorDetails
    ]);

    app.post(preUrl + '/doctorPersonalDetails',[
        DoctorController.doctorPersonalDetails
    ]);

    app.post(preUrl + '/getUserDetail',[
        DoctorController.getUserDetail
    ]);

    app.post(preUrl + '/getDoctorApproval',[
        DoctorController.getDoctorApproval
    ]);

    app.put(preUrl + '/doctor/:id',[
        DoctorController.updateById
    ]);

    app.put(preUrl + '/doctor/changePassword/:id',[
        DoctorController.changePassword
    ]);

    app.put(preUrl + '/doctor/deleteAccount/:id',[
        DoctorController.deleteAccount
    ]);

    app.delete(preUrl + '/doctor/:id',[
        DoctorController.deleteById
    ]);

    app.get(preUrl + '/deptNames',[
        DoctorController.deptNames
    ]);

    app.get(preUrl + '/distinctStates',[
        DoctorController.distinctStates
    ]);

    app.get(preUrl + '/distinctCities',[
        DoctorController.distinctCities
    ]);

    app.get(preUrl + '/doctorsOfSpec/:spec',[
        DoctorController.doctorsOfSpec
    ]);

    app.get(preUrl + '/doctorsOfCity/:city',[
        DoctorController.doctorsOfCity
    ]);

    app.get(preUrl + '/doctorsOfState/:state',[
        DoctorController.doctorsOfState
    ]);

    app.get(preUrl + '/getDoctorsForUser', [
        DoctorController.getDoctorsForUser
    ]);
    
    app.post(preUrl + '/forgotPasswordOtpLink', [
        DoctorController.forgotPasswordOtpLink
    ])

    app.post(preUrl + '/otpMatch', [
        DoctorController.otpMatch
    ])

    app.post(preUrl + '/resetPassword', [
        DoctorController.resetPassword
    ])

    app.post(preUrl + '/doctorDayOff', [
        DoctorController.doctorDayOff
    ])

    app.get(preUrl + '/getRegisteredDoctor', [
        DoctorController.getRegisteredDoctor
    ]);

    app.post(preUrl + '/doctorsByDept',[
        DoctorController.doctorsByDept
    ]);
    
    app.get(preUrl + '/cityNames',[
        DoctorController.cityNames
    ]);

    app.post(preUrl + '/getRegisteredDoctor', [
        DoctorController.getRegisteredDoctor
    ])

     //---------------------------------------------

     app.get(preUrl + '/patient',[
        PatientController.getAll
    ]);

    app.get(preUrl + '/patient/:id',[
        PatientController.getById
    ]);

    app.post(preUrl + '/patient',[
        PatientController.create
    ]);

    app.post(preUrl + '/addPatient', [
        PatientController.addPatient
    ]);

    app.put(preUrl + '/patientDetails', [
        PatientController.patientDetails
    ]);

    app.post(preUrl + '/signInPatient', [
        PatientController.signInPatient
    ]);

    app.put(preUrl + '/patient/:id',[
        PatientController.updateById
    ]);

    app.delete(preUrl + '/patient/:id',[
        PatientController.deleteById
    ]);
    
    app.put(preUrl + '/patient/addFavClinic/:id',[
        PatientController.addFavClinic
    ]);
    
    app.post(preUrl + '/patient/addPatient', [
        PatientController.addPatient
    ]);
    
    app.put(preUrl + '/patient/updatePassword/:id', [
        PatientController.updatePassword
    ]);
    
    app.get(preUrl + '/patient/sendOtp',[
        PatientController.sendOtp
    ]);

    app.get(preUrl + '/getRegisteredPatient', [
        PatientController.getRegisteredPatient
    ]);
    
    app.get(preUrl + '/PatientSignUpCountLastWeek', [
        PatientController.PatientSignUpCountLastWeek
    ]);
    
    app.get(preUrl + '/PatientSignUpCountLastMonth', [
        PatientController.PatientSignUpCountLastMonth
    ]);
    
    app.get(preUrl + '/PatientSignUpCountMonthly',[
        PatientController.PatientSignUpCountMonthly
    ]);

    // app.get(preUrl + '/patient/verifySignUpOtp',[
    //     PatientController.verifySignUpOtp
    // ]);
    

    // -----------------------
    app.post(preUrl + '/banner', [
        BannerController.create
    ]);

    app.get(preUrl + '/banner', [
        BannerController.getAll
    ]);

    app.get(preUrl + '/banner/:id',[
        BannerController.getById
    ]);

    app.put(preUrl + '/banner/:id', [
        BannerController.updateById
    ]);

    app.delete(preUrl + '/banner/:id', [
        BannerController.deleteById
    ]);


    // -------------- clinin manager
    app.post(preUrl + '/addClinicManager', [
        ClinicManagerController.addClinicManager
    ]);

    app.post(preUrl + '/clinicMangerSignIn', [
        ClinicManagerController.signIn
    ]);

    app.get(preUrl + '/clinicManager',[
        ClinicManagerController.getAll
    ]);

    app.get(preUrl + '/clinicManager/:id',[
        ClinicManagerController.getById
    ]);

    app.put(preUrl + '/clinicManager/:id',[
        ClinicManagerController.updateById
    ]);

    app.delete(preUrl + '/clinicManager/:id', [
        ClinicManagerController.deleteById
    ]);

     // -------------- doctor Contact Us
     app.post(preUrl + '/doctorContactUs', [
        DoctorContactusController.doctorContactUs
    ]);
    
    
    app.get(preUrl + '/clinic/getByUserId/:id',[
        ClinicManagerController.getById
    ]);
    
    app.put(preUrl + '/clinic/updateDetails/:id', [
        ClinicManagerController.updateDetails
    ]);

    app.put(preUrl + '/clinic/updatePassword/:id', [
        ClinicManagerController.updatePassword
    ]);
    
    app.post(preUrl + '/clinic/contactUs', [
        ClinicManagerController.ContactUs
    ]);

    // app.post(preUrl + '/clinicMangerSignIn', [
    //     ClinicManagerController.signIn
    // ]);

    // -------------- consultation details 

    app.post(preUrl + '/addConsultationDetails', [
        ConsultationDetailsController.addConsultationDetails
    ]);

    // -------------- Appointment
    app.post(preUrl + '/appointment/bookAppointment', [
        AppointmentController.bookAppointment
    ]);

    app.post(preUrl + '/appointment/getDoctorAppointement', [
        AppointmentController.getDoctorAppointement
    ]);

    app.post(preUrl + '/appointment/getCancelledAppointmentCount', [
        AppointmentController.getCancelledAppointmentCount
    ]);

    app.post(preUrl + '/appointment/getAppointementById', [
        AppointmentController.getAppointementById
    ]);
    
    app.get(preUrl + '/appointment/appointmentsOfPatients',[
        AppointmentController.getAll
    ]);
    
    app.get(preUrl + '/appointment/appointmentsOfPatient/:id',[
        AppointmentController.AppointmentsOfPatient
    ]);

    app.put(preUrl + '/appointment/cancelAppointment/:id', [
        AppointmentController.cancelAppointment
    ]);
    
    app.put(preUrl + '/appointment/updateAppointmentDate/:id', [
        AppointmentController.updateAppointmentDate
    ]);

    app.put(preUrl + '/appointment/changePaymentStatus/:id', [
        AppointmentController.changePaymentStatus
    ]);

    app.put(preUrl + '/appointment/changeStatus/:id', [
        AppointmentController.changeStatus
    ]);
    
    app.get(preUrl + '/getAppointmentsOfPatient',[
        // patients created by clinic
        AppointmentController.getAppointmentsOfPatient
    ]);
    
    app.get(preUrl + '/clinic/getAppointmentsOfClinic/:id',[
        // appointments created by clinic
        AppointmentController.AppointmentsOfClinic
    ]);
    
    app.get(preUrl + '/appointment/getAppointmentById/:id',[
        AppointmentController.getById
    ]);

    app.get(preUrl + '/clinic/TodaysAppointmentsOfClinic/:id',[
        AppointmentController.TodaysAppointmentsOfClinic
    ]);

    app.get(preUrl + '/clinic/AppointmentsOfDate/:id',[
        AppointmentController.AppointmentsOfDate
    ]);

    app.get(preUrl + '/appointment/getAllAppointments',[
        AppointmentController.getAll
    ]);

    app.get(preUrl + '/appointment/hasAnyAppointments/:id',[
        AppointmentController.hasAnyAppointments
    ]);
    
    app.get(preUrl + '/AppointmentsCountLastWeek',[
        AppointmentController.AppointmentsCountLastWeek
    ]);
    
    app.get(preUrl + '/AppointmentsCountLastMonth',[
        AppointmentController.AppointmentsCountLastMonth
    ]);
    
    app.get(preUrl + '/AppointmentsCountMonthly',[
        AppointmentController.AppointmentsCountMonthly
    ]);
    

    // app.post(preUrl + '/getAppointmentRecords', [
    //     AppointmentController.getAppointmentRecords
    // ])

    // app.post(preUrl + '/getAppointmentRecordsById', [
    //     AppointmentController.getAppointmentRecordsById
    // ])

    // --------------------- Review

    app.post(preUrl + '/review/addReview', [
        ReviewController.addReview
    ]);

    app.post(preUrl + '/review/getAllReview', [
        ReviewController.getAllReview
    ]);

    app.post(preUrl + '/review/editActiveReview', [
        ReviewController.editActiveReview
    ]);

    app.post(preUrl + '/review/removeReview', [
        ReviewController.removeReview
    ]);
    
    app.post(preUrl + '/review/getReviewById', [
        ReviewController.getReviewById
    ]);

    app.get(preUrl + '/review/getReviewsOfDoctor/:id',[
        ReviewController.getReviewsOfDoctor
    ]);
    
    app.get(preUrl + '/avgRatingOfDoctor/:id',[
        ReviewController.avgRatingOfDoctor
    ]);

    app.get(preUrl + '/favourite/getFavsOfUser/:id',[
        FavouriteController.getById
    ]);

    app.get(preUrl + '/review/getAll',[
        FavouriteController.getAll
    ]);
    
    app.post(preUrl + '/favourite/addToFav', [
        FavouriteController.addToFav
    ]);
    
    app.delete(preUrl + '/favourite/deleteFav/:id', [
        FavouriteController.deleteById
    ]);


    //----------------prescription
    app.post(preUrl + '/addPrescription', [
        PrescriptionController.addPrescription
    ]);

    app.post(preUrl + '/viewPrescription', [
        PrescriptionController.viewPrescription
    ]);

    app.post(preUrl + '/editPrescription', [
        PrescriptionController.editPrescription
    ]);

    app.post(preUrl + '/viewAllPrescription', [
        PrescriptionController.viewAllPrescription
    ]);
    
    app.get(preUrl + '/getPrescriptionByAppointmentId/:id',[
        PrescriptionController.getPrescriptionByAppointmentId
    ]);

    //--------------------------role Controller

    app.post(preUrl + '/addRole', [
        RoleController.createRole
    ]);

    app.post(preUrl + '/viewAllRole', [
        RoleController.viewAllRole
    ]);

    app.post(preUrl + '/editActiveRole', [
        RoleController.editActiveRole
    ]);

    app.post(preUrl + '/viewRoleById', [
        RoleController.viewRoleById
    ]);

    app.post(preUrl + '/editRole', [
        RoleController.editRole
    ]);

    // ------------CMS pages

    app.post(preUrl + '/cmsCreate', [
        AboutController.create
    ]);

    app.put(preUrl + '/cmsEdit/:id', [
        AboutController.edit
    ]);

    app.put(preUrl + '/cmsEditActive/:id', [
        AboutController.editActive
    ]);

    app.get(preUrl + '/cms', [
        AboutController.get
    ]);

    app.get(preUrl + '/cmsView/:id', [
        AboutController.getView
    ]);

    // ----------------Remainders
    
    app.post(preUrl + '/remainder', [
        RemainderController.create
    ]);
    
    app.get(preUrl + '/RemaindersOfUser/:id', [
        RemainderController.getByUserId
    ]);

    app.get(preUrl + '/reminder/getById/:id', [
        RemainderController.getById
    ]);
    
    app.put(preUrl + '/updateStatusOfRemainder/:id', [
        RemainderController.updateStatus
    ]);
    
    app.put(preUrl + '/reminder/updateReminder/:id', [
        RemainderController.updateReminder
    ]);

    app.get(preUrl + '/reminders/RemindersOfDate/:id',[
        RemainderController.RemindersOfDate
    ]);

    app.get(preUrl + '/reminders/filterType/:id',[
        RemainderController.filterType
    ]);

    // ------------------------Payments

    app.post(preUrl + '/payments/createOrder',[
        PaymentController.initiatePayment
    ]);
    
    app.post(preUrl + '/payments/verifySignature',[
        PaymentController.verify
    ]);
    
    app.post(preUrl + '/payments/savePayment',[
        PaymentController.savePayment
    ]);
    
    app.post(preUrl + '/payments/initiateRefund',[
        PaymentController.initiateRefund
    ]);
    
    app.put(preUrl + '/payments/updateRefundStatus',[
        PaymentController.updateRefundStatus
    ]);

    // ---------------------------VideoApi

    app.post(preUrl + '/video/create-room',[
        VideoController.createRoom
    ]);

    // ---------------------------Notifications

    app.get(preUrl + '/notifications/notificationsOfDoctor/:id',[
        NotificationController.notificationsOfDoctor
    ]);
    
    app.get(preUrl + '/notifications/notificationsOfPatient/:id',[
        NotificationController.notificationsOfPatient
    ]);

    app.post(preUrl + '/notifications/createByPostRequest',[
        NotificationController.createByPostRequest
    ]);
}