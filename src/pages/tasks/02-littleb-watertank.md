---
title: Water Tank Triangle
site: Little Black
level: 1
distance: ???km
timeLimit: 00:10
waypoints:
  - &launch
    abbr: LB-300
    desc: Little Black Main Launch
    lat: 32.987942
    lon: -117.122224
  - &lb500
    abbr: LB-500
    desc: Little Black 500 Launch
    coord: [32.984721, -117.119825]
  - &water
    abbr: WATER
    desc: Water tank at Little Black
    lat: 32.983964
    lon: -117.127351
task:
  - <<: *launch
    alt: 500m
    radius: 100m
  - <<: *lb500
    alt: 550m
    radius: 100m
  - <<: *water
    alt: 350m
    radius: 100m
  - <<: *launch
    alt: 500m
    radius: 100m
authors:
  - Paton W.
editors: []
---
This is a fairly straightforward task to get you out of the LZ fishbowl.


## Objectives

## Description
Find lift out in front and track it back over launch. Use your altitude to
hop to the next spine and track that back to the 500m launch.

Top up at the 500 then push out to the water tank.
Turn around and head back to launch.
Rinse and repeat.

## Hazards
## Tips
