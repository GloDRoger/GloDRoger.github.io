import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:studyflutter/pages/world_time/services/worldtime.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Loading extends StatefulWidget {
  Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {

  void setupWorldTime() async {

    WorldTime instance = WorldTime(location: 'HongKong', flag: 'hongkong.png', url: 'Asia/Hong_Kong');
    await instance.getTime();
    Get.offNamed('/world_time',arguments:{
      'location': instance.location,
      'time': instance.time,
      'flag': instance.flag,
      'isDaytime':instance.isDaytime,
    });
  }

  @override
  void initState() {
    super.initState();
    setupWorldTime();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:Colors.blue,
      body: Center(
        child:SpinKitWave(color: Colors.white, type: SpinKitWaveType.start),
      ),
    );
  }
}
