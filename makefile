sysAppManager: mainSysAppManager.o remoteFileManager.o globalData.o jsonString.o commManager.o appPackageManager.o appStatusManager.o deviceManager.o memoryManager.o appPackageRepo.o serviceDaemonManager.o DbusManager.o deviceRepo.o serviceDaemonRepo.o _repoClass.o miniunz.o unzip.o ioapi.o libz/libz.a
	g++ -L/usr/include -L/usr/local/xml/lib -lxml2 -lz -lm -o sysAppManager mainSysAppManager.o remoteFileManager.o globalData.o jsonString.o obj/*.o commManager.o appPackageManager.o appStatusManager.o deviceManager.o memoryManager.o appPackageRepo.o serviceDaemonManager.o DbusManager.o deviceRepo.o serviceDaemonRepo.o _repoClass.o miniunz.o unzip.o ioapi.o libz/libz.a `pkg-config --libs --cflags dbus-1 glib-2.0 dbus-glib-1` -lsqlite3 -lpthread  -Wno-write-strings -lbluetooth 

mainSysAppManager.o : mainSysAppManager.h remoteFileManager.h jsonString.h commManager.h appPackageManager.h appStatusManager.h deviceManager.h memoryManager.h serviceDaemonManager.h DbusManager.h globalData.h mainSysAppManager.cpp 
	g++ -g -c -L/usr/include remoteFileManager.h jsonString.h commManager.h appPackageManager.h appStatusManager.h deviceManager.h memoryManager.h serviceDaemonManager.h DbusManager.h globalData.h mainSysAppManager.cpp `pkg-config --libs --cflags dbus-1 glib-2.0 dbus-glib-1` -lsqlite3 -lpthread -Wno-write-strings

remoteFileManager.o : remoteFileManager.h remoteFileManager.cpp
	g++ -g -c remoteFileManager.h remoteFileManager.cpp
globalData.o : globalData.h globalData.cpp
	g++ -g -c globalData.h globalData.cpp  -Wno-write-strings

jsonString.o : jsonString.h commManager.h jsonString.cpp
	g++ -g -c jsonString.h commManager.h jsonString.cpp  -Wno-write-strings

commManager.o : jsonString.h commManager.h commManager.cpp
	g++ -g -c jsonString.h commManager.h commManager.cpp ./obj/opel_cmfw.o -Wno-write-strings -lbluetooth -Iinc

miniunz.o : libz/miniunz.c libz/miniunz.h libz/ioapi.c libz/unzip.c 
	gcc -g -c libz/miniunz.c libz/miniunz.h libz/ioapi.c libz/unzip.c -L./libz/libz.a

appPackageManager.o : libz/miniunz.h jsonString.h appPackageManager.h globalData.h appPackageManager.cpp 
	g++ -Wall -g -c libz/miniunz.h jsonString.h appPackageManager.h globalData.h appPackageManager.cpp -I/usr/local/xml/include/libxml2  -Wno-write-strings -L./libz/libz.a

	
appPackageRepo.o : _repoClass.h jsonString.h appPackageRepo.cpp
	g++ -g -c _repoClass.h jsonString.h appPackageRepo.cpp  -Wno-write-strings

appStatusManager.o : jsonString.h appStatusManager.h globalData.h  appStatusManager.cpp 
	g++ -g -c globalData.h jsonString.h appStatusManager.h appStatusManager.cpp  -Wno-write-strings

deviceManager.o : deviceManager.h deviceRepo.h _repoClass.h deviceManager.cpp
	g++ -g -c deviceManager.h deviceRepo.h _repoClass.h deviceManager.cpp  -Wno-write-strings

deviceRepo.o : _repoClass.h deviceRepo.cpp
	g++ -g -c  _repoClass.h deviceRepo.cpp  -Wno-write-strings

memoryManager.o : memoryManager.h memoryManager.cpp
	g++ -g -c memoryManager.h memoryManager.cpp  -Wno-write-strings

serviceDaemonManager.o : serviceDaemonManager.h serviceDaemonRepo.h _repoClass.h serviceDaemonManager.cpp
	g++ -g -c  serviceDaemonManager.h serviceDaemonRepo.h _repoClass.h serviceDaemonManager.cpp  -Wno-write-strings

serviceDaemonRepo.o : _repoClass.h serviceDaemonRepo.cpp
	g++ -g -c _repoClass.h serviceDaemonRepo.cpp  -Wno-write-strings

_repoClass.o : _repoClass.cpp
	g++ -g -c -L/usr/include _repoClass.h _repoClass.cpp -lsqlite3  -Wno-write-strings

DbusManager.o : commManager.h appStatusManager.h globalData.h DbusManager.cpp 
	g++ -g -c commManager.h appStatusManager.h DbusManager.h globalData.h DbusManager.cpp `pkg-config --libs --cflags dbus-1 glib-2.0 dbus-glib-1`  -Wno-write-strings

clean:
	rm -f sysAppManager *.o *.gch
