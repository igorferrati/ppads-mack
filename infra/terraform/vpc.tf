resource "google_compute_firewall" "webAccess" {
  name = "web-access"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["5432", "54321", "8080", "8081", "3000", "22"]
  }

  source_ranges = ["0.0.0.0/0"]
}
