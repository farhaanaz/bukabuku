resource "aws_instance" "bukabukuwebinstance" {
  ami                    = data.aws_ami.amiID.id
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.bukabuku.key_name
  vpc_security_group_ids = [aws_security_group.bukabuku_sg.id]
  availability_zone      = "us-east-1a"

  user_data = file("${path.module}/user_data.sh")
  user_data_replace_on_change = true
  
  tags = {
    Name    = "bukabuku-instance"
    Project = "thesis"
  }

}

resource "aws_ec2_instance_state" "web-state" {
  instance_id = aws_instance.bukabukuwebinstance.id
  state       = "running"

}