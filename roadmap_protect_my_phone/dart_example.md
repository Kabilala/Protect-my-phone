# Exemple de code Flutter pour l'application "Protect My Phone"

Voici un exemple simple de ce à quoi pourrait ressembler le code Flutter pour l'écran d'accueil de l'application :

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(ProtectMyPhoneApp());
}

class ProtectMyPhoneApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Protect My Phone',
      theme: ThemeData(
        primaryColor: Color(0xFF4C68D7),
        colorScheme: ColorScheme.fromSwatch().copyWith(
          secondary: Color(0xFF00C6FF),
          tertiary: Color(0xFFFF5252),
        ),
        fontFamily: 'Montserrat',
      ),
      home: HomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // Score de sécurité simulé (0-100)
  int securityScore = 78;
  
  // Nombre d'applications avec accès sensible
  int appsWithSensitiveAccess = 5;
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF1A1A2E),
      appBar: AppBar(
        title: Text(
          'Protect My Phone',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Color(0xFF4C68D7),
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(Icons.settings),
            onPressed: () {
              // Naviguer vers les paramètres
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Score de sécurité
              SecurityScoreCard(score: securityScore),
              
              SizedBox(height: 24),
              
              // Applications à risque
              RiskAppsCard(appsCount: appsWithSensitiveAccess),
              
              SizedBox(height: 24),
              
              // Conseils de sécurité
              SecurityTipsCard(),
              
              SizedBox(height: 24),
              
              // Guide de bonnes pratiques
              GoodPracticesCard(),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Color(0xFF1A1A2E),
        selectedItemColor: Color(0xFF00C6FF),
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Accueil',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.apps),
            label: 'Apps',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shield),
            label: 'Sécurité',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profil',
          ),
        ],
        currentIndex: 0,
        onTap: (index) {
          // Gérer la navigation
        },
      ),
    );
  }
}

// Widget pour le score de sécurité
class SecurityScoreCard extends StatelessWidget {
  final int score;
  
  const SecurityScoreCard({Key? key, required this.score}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    Color scoreColor;
    String statusText;
    
    if (score >= 80) {
      scoreColor = Colors.green;
      statusText = 'Excellent';
    } else if (score >= 60) {
      scoreColor = Colors.orange;
      statusText = 'Bien';
    } else {
      scoreColor = Colors.red;
      statusText = 'À risque';
    }
    
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: Color(0xFF2A2A4A),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Score de Sécurité',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(Icons.security, color: Colors.white),
              ],
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      width: 120,
                      height: 120,
                      child: CircularProgressIndicator(
                        value: score / 100,
                        strokeWidth: 12,
                        backgroundColor: Colors.grey.shade800,
                        valueColor: AlwaysStoppedAnimation<Color>(scoreColor),
                      ),
                    ),
                    Column(
                      children: [
                        Text(
                          '$score%',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          statusText,
                          style: TextStyle(
                            color: scoreColor,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: 20),
            TextButton.icon(
              icon: Icon(Icons.refresh),
              label: Text('Analyser à nouveau'),
              style: TextButton.styleFrom(
                foregroundColor: Color(0xFF00C6FF),
              ),
              onPressed: () {
                // Action d'analyse
              },
            ),
          ],
        ),
      ),
    );
  }
}

// Widget pour les applications à risque
class RiskAppsCard extends StatelessWidget {
  final int appsCount;
  
  const RiskAppsCard({Key? key, required this.appsCount}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: Color(0xFF2A2A4A),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Applications à surveiller',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(Icons.warning_amber, color: Colors.amber),
              ],
            ),
            SizedBox(height: 12),
            Text(
              '$appsCount applications ont accès à des données sensibles',
              style: TextStyle(
                color: Colors.white70,
                fontSize: 16,
              ),
            ),
            SizedBox(height: 12),
            ElevatedButton(
              child: Text('Vérifier les permissions'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF00C6FF),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
              onPressed: () {
                // Navigation vers la page des permissions
              },
            ),
          ],
        ),
      ),
    );
  }
}

// Widget pour les conseils de sécurité
class SecurityTipsCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: Color(0xFF2A2A4A),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Conseil du jour',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(Icons.lightbulb, color: Colors.yellow),
              ],
            ),
            SizedBox(height: 12),
            Text(
              'Utilisez l\'authentification à deux facteurs pour protéger vos comptes les plus importants.',
              style: TextStyle(
                color: Colors.white70,
                fontSize: 16,
              ),
            ),
            SizedBox(height: 12),
            TextButton(
              child: Text('Plus de conseils'),
              style: TextButton.styleFrom(
                foregroundColor: Color(0xFF00C6FF),
              ),
              onPressed: () {
                // Navigation vers la page de conseils
              },
            ),
          ],
        ),
      ),
    );
  }
}

// Widget pour les bonnes pratiques
class GoodPracticesCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      color: Color(0xFF2A2A4A),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Guide de sécurité',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(Icons.book, color: Colors.white),
              ],
            ),
            SizedBox(height: 12),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Color(0xFF00C6FF),
                child: Text('1'),
              ),
              title: Text(
                'Protéger vos mots de passe',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: Text(
                'Apprendre à créer des mots de passe sécurisés',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: Icon(Icons.arrow_forward, color: Colors.white70),
              onTap: () {
                // Navigation vers le guide
              },
            ),
            Divider(color: Colors.white24),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Color(0xFF00C6FF),
                child: Text('2'),
              ),
              title: Text(
                'Détecter les arnaques',
                style: TextStyle(color: Colors.white),
              ),
              subtitle: Text(
                'Identifier les messages suspects',
                style: TextStyle(color: Colors.white70),
              ),
              trailing: Icon(Icons.arrow_forward, color: Colors.white70),
              onTap: () {
                // Navigation vers le guide
              },
            ),
            SizedBox(height: 8),
            Center(
              child: TextButton(
                child: Text('Voir tout le guide'),
                style: TextButton.styleFrom(
                  foregroundColor: Color(0xFF00C6FF),
                ),
                onPressed: () {
                  // Navigation vers le guide complet
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```