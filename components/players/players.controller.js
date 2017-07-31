(function(){
  angular
    .module('myApp')
    .controller('playersController', playersController);
    function playersController(playersService,ImageService,Upload,userService,AuthService,$cookies){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primero.(Pamela)
      function init(){
        vm.players = playersService.getPlayers();
        vm.foundCredentials = userService.findUsers(userService.getCookie());
        vm.to = new Date();
      }init();

      // Inicio de la función presave.(Pamela)
      vm.presave= function(newPlayer){
        vm.cloudObj.data.file = document.getElementById("photo").files[0];
        Upload.upload(vm.cloudObj)
          .success(function(data){
            newPlayer.photo = data.url;
            vm.save(newPlayer);
          }); // Cierre de la función success.(Pamela)
      } // Cierre de la función presave.(Pamela)

             vm.show= function(){
        document.querySelector('#showRanking').classList.remove('displayNone');
      }

         vm.hide= function(){
        document.querySelector('#showRanking').classList.add('displayNone');
      }


    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados.(Pamela)
      vm.save= function(){
        var newPlayer = {
          id: vm.code,
          firstName: vm.name,
          secondName: vm.alias,
          surname: vm.money,
          photo: vm.photo,
        }// Cierre de newStudent.(Pamela)

    // intento de restringir los usuarios que se registran
      if(vm.students.length == 0){
         studentService.setStudents(newStudent);
         document.querySelector('.Accepted').innerHTML = 'Registro completado!';
         console.log(vm.students);
         clear();
         init();
         return;
      }else{
        for(var i = 0; i < vm.students.length; i++){
          if(newStudent.id == vm.students[i].id){
             document.querySelector('.failId').innerHTML = '**El número de cédula ya  está registrado, por favor ingrese otro**';
             return;
          }
          else if(newStudent.email == vm.students[i].email){
                  document.querySelector('.failEmail').innerHTML = 'El correo electrónico ya está registrado, por favor ingrese otro';
                  document.querySelector('.failId').innerHTML = '';
                  return;
                }
                else{
                  console.log(newStudent);
                  studentService.setStudents(newStudent);
                  document.querySelector('.failId').innerHTML = '';
                  document.querySelector('.failEmail').innerHTML = '';
                  document.querySelector('.Accepted').innerHTML = 'Registro completado!';
                  console.log(vm.students);
                  clear();
                  init();
                  return;
                }
               }
          }

      }// Cierre de la función save.(Pamela)

      // Inicio: de la función getInfo, que se encarga de obtener los datos.(Pamela)
      vm.getInfo = function(pStudent){
        vm.id = pStudent.id;
        vm.firstName = pStudent.firstName;
        vm.secondName = pStudent.secondName;
        vm.surname = pStudent.surname;
        vm.secondSurname = pStudent.secondSurname;
        vm.gender = pStudent.gender;
        vm.date = new Date(pStudent.date);
        vm.civilStatus = pStudent.civilStatus;
        vm.email = pStudent.email;
        vm.telephone = pStudent.telephone;
        vm.address = pStudent.address;
        vm.weight = pStudent.weight;
        vm.height = pStudent.height;
        vm.ageCategory = pStudent.ageCategory;
        vm.weightCategory = pStudent.weightCategory;
        vm.academies = pStudent.academies;
        vm.teachers = pStudent.teachers;
        vm.grade = pStudent.grade;
        vm.password = pStudent.password
        vm.photo = pStudent.photo;
      }// Cierre de la función getInfo.(Pamela)
    //función que cambia boton segun la información para modificar Pili
    vm.hideButton = function(){
      document.querySelector('#actualizar').classList.remove('displayNone');
      document.querySelector('#registrar').classList.add('displayNone');
    }

      // Inicio de la función update, que se encarga de devolver los datos para ser editados.(Pamela)
      vm.update = function(){
        document.querySelector('#actualizar').classList.add('displayNone');
        document.querySelector('#registrar').classList.remove('displayNone');
        var studentEdited = {
          id: vm.id,
          firstName: vm.firstName,
          secondName: vm.secondName,
          surname: vm.surname,
          secondSurname: vm.secondSurname,
          gender: vm.gender,
          date: vm.date,
          civilStatus: vm.civilStatus,
          email: vm.email,
          telephone: vm.telephone,
          address: vm.address,
          weight: vm.weight,
          height: vm.height,
          ageCategory: vm.ageCategory,
          weightCategory: vm.weightCategory,
          academies: vm.academies,
          teachers: vm.teachers,
          grade: vm.grade,
          status: 'Activo',
          password: vm.password,
          photo: vm.photo
        }// Cierre de studentEdited.(Pamela)
        studentService.updateStudent(studentEdited);
        init();
        clear();
      }// Cierre de la función update.(Pamela)

      // Inicio de la función clear, que se encarga de limpiar los datos despúes de un registro.(Pamela)
      function clear(){
        vm.id = '';
        vm.firstName =  '';
        vm.secondName =  '';
        vm.surname =  '';
        vm.secondSurname =  '';
        vm.gender =  '';
        vm.date =  '';
        vm.civilStatus =  '';
        vm.email =  '';
        vm.telephone =  '';
        vm.address =  '';
        vm.weight =  '';
        vm.height =  '';
        vm.ageCategory= '';
        vm.weightCategory= '';
        vm.academies = '';
        vm.teachers = '';
        vm.grade =  '';
        vm.password = '';
        vm.photo = '';
      }// Cierre de la función clear.(Pamela)

      // Inicio de la función inactive, que se encarga de cambiar el estado del profesor.(Pamela)
      //función que cambia el estado a inabilitado.(Pamela)
      vm.inactive = function(pStudent){
        var studentsList = studentService.getStudents();
        for (var i = 0; i < studentsList.length; i++) {
          if (studentsList[i].email == pStudent.email) {
            studentsList[i].status = 'inhabilitado';
            console.log(studentsList[i].status)
          }// Cierre del if.(Pamela)
        }// Cierre del ciclo.(Pamela)
        studentService.updateState(studentsList);
        init();
      }// Cierre de la funcion inactive.(Pamela)

      //función que cambia el estado a activo.(Pamela)
      vm.active = function(pStudent){
        var studentsList = studentService.getStudents();
        for (var i = 0; i < studentsList.length; i++) {
          if (studentsList[i].email == pStudent.email) {
            studentsList[i].status = 'Activo';
            console.log(studentsList[i].status)
          }// Cierre del if.(Pamela)
        }// Cierre del ciclo.(Pamela)
        studentService.updateState(studentsList);
        init();
      }// Cierre de la funcion active.(Pamela)

      vm.logOut = function(){
        AuthService.logOut();
      }

    }// Cierre de la función studentController.(Pamela)
})();
