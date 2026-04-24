data "aws_vpc" "default" {
  default = true
}

resource "aws_security_group" "bukabuku_sg" {
  name        = "bukabuku-sg"
  description = "bukabuku-sg"
  vpc_id = data.aws_vpc.default.id
  
  tags = {
    Name = "bukabuku-sg"
  }
}

resource "aws_vpc_security_group_ingress_rule" "sshFromMyIP" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4         = "0.0.0.0/0" # get it from whatsmyip and /32 means only that IP address
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  from_port = 80
  ip_protocol = "tcp"
  to_port = 80
}

resource "aws_vpc_security_group_ingress_rule" "https" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  from_port = 443
  ip_protocol = "tcp"
  to_port = 443
}

resource "aws_vpc_security_group_ingress_rule" "grafana" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  from_port = 3000
  ip_protocol = "tcp"
  to_port = 3000
}

resource "aws_vpc_security_group_ingress_rule" "prometheus" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4 = "0.0.0.0/0"
  from_port = 9090
  ip_protocol = "tcp"
  to_port = 9090
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutboundIPv4" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_egress_rule" "allowAllOutboundIPv6" {
  security_group_id = aws_security_group.bukabuku_sg.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1"
}