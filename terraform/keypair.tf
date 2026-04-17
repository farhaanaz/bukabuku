resource "aws_key_pair" "bukabuku_key" {
  key_name   = "bukabuku-key"
  public_key = file("${path.module}/bukabuku-key.pub")
}