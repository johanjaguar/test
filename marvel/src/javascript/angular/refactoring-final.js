function post_confirm( params ) {
  const id = params.service_id;
  let servicio = Service.find(id);

  var retorno3 = ( servicio == null );
  var retorno2 = ( !retorno3 && servicio.status_id == '6');
  var retorno0 = ( !retorno3 && (servicio.driver_id == NULL && servicio.status_id == '1') );
  var retorno1 = ( !retorno3 && !(servicio.driver_id == NULL && servicio.status_id == '1') );

  if( retorno3 ){
    return {error: '3'};
  }
  if( retorno2 ){
    return {error: '2'};
  }
  if( retorno1 ){
    return {error: '1'};
  }
  if( retorno0 ){
    return confirmaServicio( driverTmp, Driver, servicio, id, Service );  
  }
}


function confirmaServicio( driverTmp, Driver, servicio, id, Service ){
  var pushMessage = "Tu servicio ha sido confirmado!";
  driverTmp = Driver.find(params.driver_id);
  Driver.update(params.driver_id, {
    available: '0'
  });

  servicio = Service.update(id, {
    driver_id: params.driver_id,
    status_id: '2',
    car_id: driverTmp.car_id
  });
    
  servicio = Service.find(id);
  push = Push.make();
  if (servicio.user.uuid == '') {
    return {error: '0'};
  }
  if (servicio.user.type == '1') {//iPhone
    push.ios(servicio.user.uuid, pushMessage, 1, 'honk.wav', 'Open', {service_id: service.id});
  } 
  else {
    push.android2(servicio.user.uuid, pushMessage, 1, 'default', 'Open', {service_id: service.id});
  }
  return {error: '0'};
}