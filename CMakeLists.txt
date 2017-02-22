cmake_minimum_required(VERSION 3.4)
project(CI346-Fire-Dragon)

set(CMAKE_VERBOSE_MAKEFILE TRUE)

add_custom_target(BurnBabyBurn
        #COMMAND /home/mr_robot/.swiftenv/versions/3.0.1-RELEASE/usr/bin/swift build
        COMMAND /usr/bin/swift build
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        SOURCES Package.swift Sources/Application/main.swift)

add_custom_target(EternalPurification
        #COMMAND /home/mr_robot/.swiftenv/versions/3.0.1-RELEASE/usr/bin/swift test
        COMMAND /usr/bin/swift test
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        )