# -*- mode: ruby -*-
# vi: set ft=ruby :
# vi: set nu :

PROJECT_NAME = "lecturesnet"
LECTURES = ENV["LECTURES"]

Vagrant.configure(2) do |config|
  config.vm.synced_folder ".",
      "/home/vagrant/lecturesnet/"

  # Lectures docs
  config.vm.define 'lecturesnet', primary: true do |lecturesnet|

    lecturesnet.ssh.port = 22
    lecturesnet.ssh.username = 'vagrant'
    lecturesnet.ssh.password = '123'

    lecturesnet.vm.provision :shell, privileged: false,
      :path => "vagrant/docker/lecturesnet/build-docs.sh",
      :env => {LECTURES: LECTURES}

    lecturesnet.vm.provider 'docker' do |docker|
      docker.name = PROJECT_NAME
      docker.build_dir = './vagrant/docker/lecturesnet/'
      docker.build_args = ['--tag=ustu/lecturesnet']
      docker.remains_running = false

      # -t - Allocate a (pseudo) tty
      # -i - Keep stdin open (so we can interact with it)
      docker.create_args = ['-i', '-t']
      docker.has_ssh = true
    end
  end
end
