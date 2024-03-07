output "external_ips" {
  value = google_compute_instance.vm-ubuntu.network_interface[0].access_config[0].nat_ip
}
