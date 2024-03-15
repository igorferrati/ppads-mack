resource "google_compute_address" "static_external" {
  name  = "mack-public-ip"
  address_type = "EXTERNAL"
}

resource "google_compute_instance" "vm-ubuntu" {
  name         = var.instance_name
  machine_type = var.instance_type
  zone = var.instance_zone

  boot_disk {
    initialize_params {
      image = var.image
      size  = var.boot_disk_size
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static_external.address
    }
  }
}