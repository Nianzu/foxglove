# Extensions
- Install npm
- Install yarn
```
sudo apt remove cmdtest
sudo apt remove yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y
```
- Create the extension
```
cd extensions
npm init foxglove-extension@latest nav_msgs_odometry_display
```

- add schemas to you extension (optional?)
```
cd nav_msgs_odometry_display/
yarn add yarn add @foxglove/schemas
```

- Create your extension
- Install your extension
```
yarn local-install
```