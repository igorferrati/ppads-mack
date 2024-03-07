variable "gcp_project" {
  type = string
  default = "clusterk8s-413514"
}

variable "gcp_region" {
  type = string
  default = "us-central1"
}

variable "gcp_zone" {
  type = string
  default = "us-central1-a"
}

variable "instance_zone" {
  type = string
  default = "us-central1-a"
}

variable "instance_name" {
  type = string
  default = "ubuntu-node"
}

variable "instance_type" {
  type = string
  default = "e2-standard-2"
}

variable "image" {
  type = string
  default = "ubuntu-2004-focal-v20230907"
}

variable "boot_disk_size" {
  type = string
  default = "20"
}