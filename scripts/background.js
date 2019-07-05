var mImages = null;
var mContextMenus = [];
var mGalleryTitle = null;
var mSecretMode = false;
var mStartIndex = 0;

loadImages(
    [
        'https://scontent-ort2-1.cdninstagram.com/vp/3629ca250bf1b70fe4eee5f68ccdb65f/5CDE6A3E/t51.2885-15/e35/49986762_2030599297235453_982089813336757569_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/4433a051d759b789d5e0af5c5d98bb48/5CDE37A1/t51.2885-15/e35/50019887_586435961806672_34193134139366573_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/ca9d31eab271e4d2cc588301c1c46d63/5CF09C1B/t51.2885-15/e35/50594486_116086502795581_2473426020928916295_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/10bf92a7e509c6a8e4063104a69b043b/5CE63950/t51.2885-15/e35/49989915_383253218908039_3935198980847077461_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/6ce05b61f97a7bbe9ad18701afc6b8b7/5CDCC600/t51.2885-15/e35/49933828_2014339665281180_6960932359842184852_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/2f0b6c8ab107bd3d3271a37112c5ce1c/5CDD9E7A/t51.2885-15/fr/e15/p1080x1080/49933936_345188633001210_8854806957632730922_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/f6c912d5892b49869e0c231109b1cc0b/5D0015EC/t51.2885-15/e35/49708888_240555060189962_7517404104380543146_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/d2f42fb6dfa1dddf61ac4b326769d5ef/5CE01903/t51.2885-15/e35/50024441_155997038722669_3528156326526997866_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/040bb8dbb5b0a8f1b567167e42f5675c/5CE7C829/t51.2885-15/e35/50174045_117180562677767_204425494021145710_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/e58f6d1e37a801e0a240e98e679d91d5/5CFA1F3C/t51.2885-15/e35/50079461_526585071181947_3906912226407214879_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/db6f1d70e3e002c7dd335fa97f74dec0/5CEC9E98/t51.2885-15/e35/49933579_817305481950764_1756717377340928604_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/508490eed4f00c4dac49a372907e6dc4/5CE5A8FA/t51.2885-15/e35/50294726_109579980017819_333920443789323967_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/a9bf09c10c8995a2bbfb94a01bd1fc41/5CF1C9E3/t51.2885-15/e35/49761578_2207568265973142_8222776275571918353_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/1f846a0143d40a9774dcd3fba35ee963/5CEF6117/t51.2885-15/e35/49858406_312209592750829_5330060817630026743_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/0995702afbd98014f4f66602509e0bda/5CF8D4E4/t51.2885-15/e35/50077724_2159366287474838_6536871605516995411_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/b6d298f2ae82a0729aa722cf25601343/5CDB539D/t51.2885-15/e35/49808614_135970820763837_2156318645658734023_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/6152f1375f73ad6e9a6623a47e43abc8/5D014BD6/t51.2885-15/e35/50049772_431100887430338_1048127932972930002_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/381ec9f0ffc1f75f1f8f3cb4fa260651/5CDEA6D6/t51.2885-15/e35/50773793_422764811795466_5574131798674405958_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/8f0504e3928811e1fabb0a5d34e765d0/5CF2E33D/t51.2885-15/e35/50795534_242528416683153_2116292023645410396_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/8a86468b5e1b017dec82d30a98d90f3f/5CF40A41/t51.2885-15/e35/26868411_579559635719274_6798582597027889152_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/14d9436cb9302cefad420f4d24d912f5/5CEFA518/t51.2885-15/e35/28154067_1236925893117647_2373688954026196992_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/860d1d30723beadd0c363bef2cd0541e/5CFC03F3/t51.2885-15/e35/38682773_2276408255709556_5314189518109147136_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/c97cb78cdb5b835775307c6578e9041a/5CFC40CA/t51.2885-15/e35/50286411_536674113504209_5780651953837917092_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/e278afa723ca3364371e7b07b6e99ab7/5CFE444E/t51.2885-15/e35/50165319_420982221976889_4422910589199624331_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/595e015ffae3fe119a13997d22a29128/5CEE465F/t51.2885-15/e35/50670232_102086967558420_1324042937571490222_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/fb3c27978366b3f13324c754fcabbfd6/5D00D65E/t51.2885-15/e35/52365808_452108748660795_6947419272405593751_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/0c1801e02ea2171914191db37b6d48b2/5CFDB0C2/t51.2885-15/e35/24254419_1992417541047246_2861125110276816896_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/0e5cb187e1222b5814bb7c21d3c5c4e2/5CE2FF48/t51.2885-15/e35/51363283_2116771075081857_2942336291054923134_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/9c3c513ea363b46e0552997d41f5e1db/5CECAB20/t51.2885-15/e35/50818725_397237590843484_3782400997093637966_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/83048822f9a67a49f8f3eb24ff15793c/5CE30F03/t51.2885-15/e35/50766676_2091680360915083_3367943434881026725_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/f2298c857f41ef5b34ab2602b606f59a/5CF487AA/t51.2885-15/e35/51579416_103303194060106_403485693214627800_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/b52e31896c5ea88ee17c7ffa3a7594ab/5CFACCFC/t51.2885-15/e35/51332348_332668584015127_7932851533147942131_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/7e095d0fcbe18ba632ff6b5c72782e8f/5CF7EE60/t51.2885-15/e35/50767932_145294123156276_2902529558630156573_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/5188a4e5c7a7b8ed91b8cc822946dbdb/5CFBCB9B/t51.2885-15/e35/50745872_1877346482371107_5753593060371616046_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/f7ce0915e0c0cb18bdbdf20f828b4554/5D02BB89/t51.2885-15/e35/50640906_314241239438644_1529060947477772028_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/8508dd4f2cd6bf6eab0cc5d6910824e3/5CF8C2BB/t51.2885-15/e35/50716178_779578349077657_1084825371246469402_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/27c6e7932313c81b699c7edd6923090e/5CF1762D/t51.2885-15/e35/p1080x1080/52002831_2176943989223620_57685711108482147_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/e53ba9c337a2facee26dffe7cc5b07ed/5CEBBD74/t51.2885-15/e35/51059408_1164040003775113_6370400074303363624_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/e1498becedbcd6614db4a741090929cf/5D2830A7/t51.2885-15/e35/s1080x1080/52651675_328038381149666_586668750891667389_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/15781193_226498311136214_1884423740518393666_n.jpg?_nc_cat=105&_nc_ht=scontent-ort2-1.xx&oh=a232ac41c9b1043ec191aed6921510ed&oe=5CF6A651',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/46489657_2155491991147787_7454506291621265408_n.jpg?_nc_cat=103&_nc_ht=scontent-ort2-1.xx&oh=92e28fa682fce21db822dd83c7bd3d03&oe=5CECFFDA',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/44074822_2104786202885033_1597976276495237120_n.jpg?_nc_cat=110&_nc_ht=scontent-ort2-1.xx&oh=fe95f42ab78d6fe6e922be2f3ddfb61c&oe=5CF1D016',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/36268647_1734556069915093_1114131593372368896_n.jpg?_nc_cat=107&_nc_ht=scontent-ort2-1.xx&oh=2ab0aaa291d31f430bab064aa3a614e4&oe=5D28D37B',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/13692485_1309936979036119_3709834516251775714_n.jpg?_nc_cat=107&_nc_ht=scontent-ort2-1.xx&oh=f23b4962ebb6f525767ae3eb1a81dd23&oe=5D262223',
        'https://scontent-ort2-1.cdninstagram.com/vp/8d6b3abf42bcfcc87f1aa35b451f6d44/5CF2115F/t51.2885-15/e35/51019950_330078377851185_4532621014003968650_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/e1440773d6fadffcded6b1b288d78502/5D1D282F/t51.2885-15/e35/53030737_639782249790990_5748559378064548551_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/5294cb406794fdb9fd345bb24fa7a297/5D074F74/t51.2885-15/e35/51745169_382894558928221_3562042565131459921_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/38835c502a26ddca76e067053647cb6a/5D040FD0/t51.2885-15/e35/51362678_158813681774484_441148804617892138_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/4f61ad432cdd6a69213c20f18cb12475/5D24D5F1/t51.2885-15/e35/52400345_146547313043366_76488503531717120_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/6c101834e1c0216f33a157ad459215a1/5D1A1870/t51.2885-15/e35/52136349_133261594393381_1191176564862111923_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/33f5070756e1055abb1df74533e5aceb/5D10F8F3/t51.2885-15/e35/54446645_2000231160025458_6839406104914885727_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/17796337_1398596043532501_7140955563907010781_n.jpg?_nc_cat=111&_nc_ht=scontent-ort2-1.xx&oh=50a7fb6c059414363d02d04c93f70242&oe=5CE098D3',
        'https://scontent-ort2-1.cdninstagram.com/vp/7ec9c07064c649e2addc8d396f23f22a/5D232005/t51.2885-15/e35/52623085_814500862259243_4632565761289051687_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/cd9865ecfe2c8966549a5de5224cc936/5D47B708/t51.2885-15/e35/47043585_528047624362806_7200767405633075807_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'null',
        'https://scontent-lga3-1.cdninstagram.com/vp/6a1e16c7575b9582b16275d03eb46e22/5D0DFB3F/t51.2885-15/e35/54513496_266134287671877_1214916468181127742_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/8f73d19f8f91cdf3badc396c0fb6bba2/5D29424A/t51.2885-15/e35/53248519_1242533689255621_489439944745611009_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/4d4737838a27a4ea631ac682b84676a4/5D10E3FA/t51.2885-15/e35/53344763_127425438370319_5995397824517965776_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/5cfc59056754500e9e9e65b2512c4b3d/5D167E26/t51.2885-15/e35/19624968_273444469803126_424773450985373696_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/ebdf5b73a881012bd84f9dd574dc379d/5D0EC740/t51.2885-15/e35/40467093_349694882264364_8455724315768258560_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/8f2f4dc0d2af59a3f163c2383bffb28d/5D498D19/t51.2885-15/e35/53211761_411891009357547_6407407851592050885_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-lga3-1.cdninstagram.com/vp/3c73a80b076d086f81502149062929ad/5D47C9D7/t51.2885-15/e35/53848846_1183805621786679_5713750328492704615_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/bc6ce24e084e21ec0a26a785eba072cb/5D3E02B2/t51.2885-15/e35/56377263_152291562471592_3774627006600820016_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/4ee68e0ac2613cc779665b3da78c0acd/5D48C543/t51.2885-15/e35/54447127_314153229260502_7684796802066369769_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/9896b934f5de494bef188587b3352ceb/5D3628B8/t51.2885-15/e35/54800789_277543949844809_7604371224906377593_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/fd415fe924674344432111cbe908a2fd/5D3D92B7/t51.2885-15/e35/56981664_507817433377859_557661174419505128_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/01c7068a41318f49a9286f9f145bd044/5D4A0114/t51.2885-15/e35/54513195_126335721846760_3977252306240907437_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/51469633_2992152047469013_5381190393746423808_n.jpg?_nc_cat=109&_nc_ht=scontent-ort2-2.xx&oh=34bb0ab46e29ad156434805eda4f7bda&oe=5D463CF7',
        'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/944629_617672064912102_222766314_n.jpg?_nc_cat=102&_nc_ht=scontent-ort2-2.xx&oh=9700ada66ad1beff57132e8a97ee3d18&oe=5D40542F',
        'https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/383770_343977675631901_1764272014_n.jpg?_nc_cat=108&_nc_ht=scontent-ort2-2.xx&oh=8d2f4562d62af0f452b140603e7c8e8b&oe=5D43D030',
        'https://scontent-ort2-2.xx.fbcdn.net/v/t31.0-8/258686_1789890306524_6536165_o.jpg?_nc_cat=110&_nc_ht=scontent-ort2-2.xx&oh=c777d09580cc7ae37c03c0d3a72f5b5e&oe=5D352AC2',
        'https://scontent-yyz1-1.cdninstagram.com/vp/091a95574a983f48ecf2c0fbdc42c923/5D53A222/t51.2885-15/e35/57511879_283684879242401_984590894062371605_n.jpg?_nc_ht=scontent-yyz1-1.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/cbdf1d4152aa6454c4ff2afb18ae6334/5D683EEF/t51.2885-15/e35/p1080x1080/60355870_1766742373427495_379481576537351833_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/abcc96e3a23ec293db818088deec9c23/5D5C51E9/t51.2885-15/e35/s1080x1080/59703799_2294542534135763_1247238876225165261_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/21882057d1d1ce9a1c34d333f442924b/5D586DC7/t51.2885-15/e35/p1080x1080/58410757_1071394666388193_8343908847195260713_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/3960e0f84b119897dd65b471107a1fc4/5D9DDD20/t51.2885-15/e35/p1080x1080/58410717_1237200746438727_6509033832580099912_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/7a7b371bb9f29968518ff042f1057796/5D5D9BC1/t51.2885-15/e35/s1080x1080/60144385_622010991649194_7473369214681612844_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/cf788da596edaeb2978fbc77e99dac95/5D94B809/t51.2885-15/e35/s1080x1080/60261512_133865561049195_7181468470741520961_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/64fc02699f6aa28fc4b5ad67286c703b/5D9432EA/t51.2885-15/e35/s1080x1080/60703753_432713460860778_5188980349308709632_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-ort2-2.cdninstagram.com/vp/e8970d8c3680453fe5c0a4d687f54474/5D940482/t51.2885-15/e35/s1080x1080/60906968_2041317389309943_3330738897135092022_n.jpg?_nc_ht=scontent-ort2-2.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/a8b9c1372509adcf39533de3a0fa834e/5D8AD891/t51.2885-15/e35/s1080x1080/61994010_1320858414736235_2727576262701579569_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/15633d55ace4ffa2efcd4aa887a52001/5D999F09/t51.2885-15/e35/61996479_493956681343042_3706557030553295941_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/0d58b73bf83d60afe1d58afcc1c556cb/5D81ED6A/t51.2885-15/e35/p1080x1080/62375865_609550542889714_8462645818087332627_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/fc2299c54213f3909e77dd18eaa47aad/5D934AF8/t51.2885-15/e35/s1080x1080/62434729_587826011708459_6106335419042949589_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/23b4a8abaaf99f4e07c1ef874967e340/5DC50EF4/t51.2885-15/e35/62637014_2383606155009127_5564349488498760968_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/fc7c9b62fad4bdb0dc2482c13b004278/5D96CAD0/t51.2885-15/e35/s1080x1080/64687875_2064608180332221_401396947449395214_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/ada395aa4e8784d202c205036f716e3c/5D8DCA05/t51.2885-15/e35/p1080x1080/64641563_829243504236841_705176131920284878_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/f6d4aa3718bc3ce9d0be6ffaed77ed11/5DC65F68/t51.2885-15/e35/s1080x1080/64412223_345819436105053_2170386098561821710_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/02028fb5ababa1083c52b85e65476703/5DA0FEE6/t51.2885-15/e35/p1080x1080/65079039_676001126182626_2022450495264397556_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/ae12f95c2b5f5f470b60d6fb6bb78747/5D891D17/t51.2885-15/e35/p1080x1080/64344203_473610833392916_6363675505680719309_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-ort2-1.cdninstagram.com/vp/dc9ea7ab02c17e965aa061e699785641/5D88F0C9/t51.2885-15/e35/s1080x1080/62577302_3018809908144045_219435118534010468_n.jpg?_nc_ht=scontent-ort2-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/9d251f128909997dc34741989a99b3d8/5DB6447B/t51.2885-15/e35/p1080x1080/65302932_1161636794023325_6292308984694638981_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/dabb8a26d1fa79a9d45c113c8ed87fcd/5DBADC7D/t51.2885-15/e35/p1080x1080/65313376_409972639617601_4983325360534690088_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/c26bdc10c5685afaf1a759e155177561/5DA13EF1/t51.2885-15/e35/p1080x1080/65879087_423628658227762_2717420341304600453_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/7bc991aa8555c357b585975b1d981afd/5DB218CF/t51.2885-15/e35/64809832_178134706529080_5529695458971466345_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/22013081054bf133d0f77d5bb39516c9/5DA3E9C4/t51.2885-15/e35/p1080x1080/66025874_1467628013390974_1762745707231876992_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/be6f97103fae810cdc60d4528071bf4d/5DADFC9B/t51.2885-15/e35/p1080x1080/65317071_148225142991738_5622545916570302218_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/61965797_10214141377868758_8813641442535669760_n.jpg?_nc_cat=110&_nc_oc=AQn_x5GffaR245-Bu4Jn0Ai2eGpPG5UX5GgR4HzQYxzebyO4tcaOj0ZtsYCP4n093u-GGTjnWF3gK69m4Q9EvjMK&_nc_ht=scontent-iad3-1.xx&oh=27d00cf8e13a6023a47d93ead2b79efb&oe=5DB1E7F0',
        'https://scontent-iad3-1.cdninstagram.com/vp/37928fdf8055cc129efb2589aa35b83b/5DC08A78/t51.2885-15/e35/p1080x1080/66434771_700153340406877_5461532634157421695_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        'https://scontent-iad3-1.cdninstagram.com/vp/b69e64ebbd40880d0fb5e1033c461962/5DAA7824/t51.2885-15/e35/p1080x1080/65303477_388340018707058_5489696628840528678_n.jpg?_nc_ht=scontent-iad3-1.cdninstagram.com',
        ]
)

chrome.contextMenus.create({
    "id": "deleteImage",
    "title": "Delete image",
    "documentUrlPatterns": ["chrome-extension://*/gallery/gallery.html"],
    contexts: ["image"]
}, function() {
    console.log(chrome.runtime.lastError);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "openPage") {
            let newTab = request.newTab;
            if (typeof newTab === 'undefined') newTab = true;
            if (newTab) chrome.tabs.create({url: request.page});
            else chrome.tabs.update({url: request.page});

            mImages = request.images;
            mGalleryTitle = request.title || mGalleryTitle;
            mStartIndex = request.index || 0;
        } else if (request == "getImages") {
            sendResponse({images: mImages, title: mGalleryTitle, index: mStartIndex});
        } else if (request == "addContextMenu") {
            addSaveCM();
        } else if (request == "removeContextMenu") {
            removeSaveCM();
        } else if (request == "getSecretMode") {
            sendResponse(mSecretMode);
        }  else if (request.action == deleteImage) {
            deleteImage(request.url);
        }
    }
);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == "saveImage") {
        var message = {action: "saveImage", secret: mSecretMode};
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                // TODO: check if saved
            });
        });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.sendMessage(activeInfo.tabId, "isInjected", function(response) {
        if(chrome.runtime.lastError) {
                removeSaveCM();
        } else {
            response = response || {};
            if (!response.injected) {
                removeSaveCM();
            } else {
                addSaveCM();
            }
        }
    }); 
});

chrome.commands.onCommand.addListener(function(command) {
    if (command == "secret-mode") {
        mSecretMode = !mSecretMode;
        var message = "Secret mode is " + (mSecretMode ? "on" : "off");
        alert(message);
    }
});

function addSaveCM() {
    chrome.contextMenus.create({
        id: "saveImage",
        title: "Save image",
        contexts: ["all"]
    }, function() {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}

function removeSaveCM() {
    chrome.contextMenus.remove('saveImage', function() {
        console.log(chrome.runtime.lastError); // TODO: Make sure this can be ignored
    });
}

function loadImages(images) {
    chrome.storage.local.get("secretImages", function(result) {
		mImages = result.savedImages || [];

        for(var i = 0; i < images.length; i++) {
            if(!mImages.includes(images[i])) {
                mImages.push(images[i]);
            }
        }
        chrome.storage.local.set({"secretImages": mImages});	
	});
}

function deleteImage(url) {
    
}