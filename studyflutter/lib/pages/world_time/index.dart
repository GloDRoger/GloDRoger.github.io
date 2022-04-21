import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:studyflutter/pages/world_time/pages/loading.dart';
import 'package:studyflutter/pages/world_time/pages/choose_location.dart';

class WorldTimeHome extends StatefulWidget {
  WorldTimeHome({Key? key}) : super(key: key);

  @override
  State<WorldTimeHome> createState() => _WorldTimeHomeState();
}

class _WorldTimeHomeState extends State<WorldTimeHome> {
  Map data = {};

  @override
  Widget build(BuildContext context) {

    data = data.isNotEmpty ? data : Get.arguments as Map;
    print(data);

    String bgImage = data['isDaytime'] ? 'day.png' : 'night.png';
    Color? bgColor = data['isDaytime'] ? Color(0xFF1288C8) : Color(0xFF272760);

    return Scaffold(
        appBar: AppBar(backgroundColor: bgColor,),
        backgroundColor: bgColor,
        body: SafeArea(
          bottom:false,
          child: Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('images/$bgImage'), 
                    fit: BoxFit.cover,
                  )
              ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(0, 120.0, 0, 0),
              child: Column(
                children: [
                  TextButton.icon(
                      onPressed: () async {
                        dynamic result = await Get.toNamed('/world_time/choose_location');
                        setState(() {
                          data = result;
                        });
                      },
                      icon: Icon(Icons.edit_location,color: Colors.grey[200],),
                      label: Text('Edit Location',style: TextStyle(color: Colors.grey[200],),)),
                  SizedBox(
                    height: 20.0,
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        backgroundImage:AssetImage(data['flag'])
                      ),
                      SizedBox(width: 10.0,),
                      Text(data['location'],
                          style: TextStyle(
                            fontSize: 28.0,
                            letterSpacing: 2.0,
                            color: Colors.white,
                          ))
                    ],
                  ),
                  SizedBox(
                    height: 20.0,
                  ),
                  Text(
                    data['time'],
                    style: TextStyle(fontSize: 66.0,color: Colors.white,),
                  )
                ],
              ),
            ),
          ),
        ),
      );
  }
}
