#!/bin/bash

# INSTALL NODE JS AND DEPENDENCIES
display_help() {
    echo "Usage: $( basename $0 ) [option...] " >&2
    echo
    echo "   -h | --help           Display this help menu"
    echo "   -v | --verbose	       Increase logging/printing level"
    echo "   --with-db-create      Execute with database [re]creation"
    echo
    exit 1
}

OPTS=`getopt -o vh --long verbose,help -n 'test' -- "$@"`
if [ $? != 0 ] ; then echo "Failed parsing options." >&2 ; exit 1 ; fi

eval set -- "$OPTS"

VERBOSE=false

while true; do
	case "$1" in
    -v | --verbose)
	    VERBOSE=true
	    shift;;
    -h | --help)
    	display_help
    	exit 0
    	;;
    -- ) shift; break;;
    * ) break;;

	esac
done



# Import the mongodb public key used by the package management system
if $VERBOSE; then echo -e '\033[0;33m[+] Including mongodb package key...\t\033[0m'; fi
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

# Create a list file for MongoDB
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

# update system registry and packages
sudo apt-get update

# ensure c++ compiler is installed
sudo apt-get install -y build-essential libssl-dev nodejs npm mongodb-org

# change mongo default settings to [never] to avoid startup warnings when initalizing a mongo session
#sed -i 's/always/never/g' /sys/kernel/mm/transparent_hugepage/defrag /sys/kernel/mm/transparent_hugepage/enabled

# install mongodb driver
if $VERBOSE; then echo -e '\033[0;33m[+] Installing node.js packages and drivers...\t\033[0m'; fi
npm install mongodb minimist sendgrid nodemailer glob cheerio


# create norad user if does not exist
if [ ! $(id -u noradapi) ]; then
  # make a new user for this specific api engine
  sudo useradd -s /bin/bash -d /var/opt/norad noradapi
  if $VERBOSE; then echo -e '\033[0;33m[+] Created noradapi system user.\t\033[0m'; fi
fi

# create norad gitlab ssh key if not exists
if [ ! -f /var/opt/norad/.ssh/gitlab ]; then
  sudo mkdir -p /var/opt/norad/.ssh/
  sudo -u noradapi ssh-keygen -q -t RSA -C 'norad.com' -f /var/opt/norad/.ssh/gitlab -N ''
  sudo -u noradapi touch /var/opt/norad/.ssh/config
  sudo chmod 766 /var/opt/norad/.ssh/config
  sudo chown -R noradapi:noradapi /var/opt/norad
  sudo -u noradapi echo -e "Host gitlab.emerus.com\n\tIdentityFile /var/opt/norad/.ssh/gitlab" > /var/opt/norad/.ssh/config

  if $VERBOSE; then echo -e '\033[0;33m[+] Generated noradapi RSA key pair for gitlab.\t\033[0m'; fi
fi


# create the repo directory structure
#if $VERBOSE; then echo -e '\033[0;33m[+] Creating git remote repo directory structure...\033[0m'; fi
#git clone git@gitlab.emerus.com:scripts/norad-api-repo.git ./bin/norad-api-repo.git

# copy the upstart script to the /etc/init directory
#if $VERBOSE; then echo -e '\033[0;33m[+] Copying OS upstart script to /etc/init/...\033[0m'; fi
#sudo cp $DIR/norad.conf /etc/init/

# return cat of gitlab public key and instructions for uploading to project keys in gitlab
#echo -e '\033[0;33m[+] Finished. \033[0m\n'
#echo -e "Copy the noradapi user public key to the gitlab repository"
#echo -e "'Deploy Keys' area within the 'norad-api-repo' project settings.\n"
#echo "--------copy below this line------------"
#cat /var/opt/norad/.ssh/gitlab.pub
#echo "--------copy above this line------------"
