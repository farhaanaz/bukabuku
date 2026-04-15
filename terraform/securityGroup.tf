resource "aws_security_group" "bukabuku-sg" {
  name        = "bukabuku-sg"
  description = "bukabuku-sg"

  tags = {
    Name = "bukabuku-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "sshFromMyIP" {
  security_group_id = aws_security_group.bukabuku-sg.id
  cidr_ipv4         = "103.94.5.235/32" # get it from whatsmyip and /32 means only that IP address
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutboundIPv4" {
  security_group_id = aws_security_group.bukabuku-sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutboundIPv6" {
  security_group_id = aws_security_group.bukabuku-sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}