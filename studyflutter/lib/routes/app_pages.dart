import 'package:get/get.dart';
import 'package:studyflutter/index.dart';
import 'package:studyflutter/pages/ninjia/index.dart';
import 'package:studyflutter/pages/quote/index.dart';
import 'package:studyflutter/pages/world_time/index.dart';
import 'package:studyflutter/pages/world_time/pages/choose_location.dart';
import 'package:studyflutter/pages/world_time/pages/loading.dart';
import 'package:studyflutter/pages/world_time/services/worldtime.dart';

part 'app_routes.dart';

class AppPages {
  static const INITIAL = AppRoutes.Home;

  static final routes = [
    GetPage(
      name: AppRoutes.Home,
      page: () => HomePage(),
    ),
    GetPage(name: AppRoutes.Ninjia, page: () => NinjiaCard()),
    GetPage(name: AppRoutes.Quote, page: () => QuoteList()),
    GetPage(
      name: AppRoutes.Loading,
      page: () => Loading(),
    ),
    GetPage(name: AppRoutes.WorldTime, page: () => WorldTimeHome(), children: [
      GetPage(name: AppRoutes.ChooseLocation, page: () => ChooseLocation())
    ])
  ];
}
