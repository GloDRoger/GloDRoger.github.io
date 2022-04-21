
import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';


class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('主页')),
      body: Padding(
        padding: const EdgeInsets.fromLTRB(20.0, 20.0, 20.0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextButton.icon(
              onPressed: () {
                Get.toNamed('/ninjia');
              },
              icon: Icon(Icons.assignment_ind),
              label: Text('Ninjia ID'),
            ),
            TextButton.icon(
              onPressed: () {
                Get.toNamed('/quote');
              },
              icon: Icon(Icons.speaker_notes),
              label: Text('Quotes'),
            ),
            TextButton.icon(
              onPressed: () {
                Get.toNamed('/loading');
              },
              icon: Icon(Icons.public),
              label: Text('World_time'),
            ),
          ],
        ),
      ),
    );
  }
}