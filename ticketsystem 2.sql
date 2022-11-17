use helpdesk;

drop table user;
drop table employee;
drop table ticket;

drop view viewTickets;

create table user(
	userid int primary key auto_increment,
    username varchar(20),
    userfname varchar(20),
    userlname varchar(20)
);

create table employee(
	empid int primary key auto_increment,
    empusername varchar(20),
    empfname varchar(20),
    emplname varchar(20)
);

create table ticket(
	ticketid int primary key auto_increment,
    userid int references not null user,
    empid int references employee,
    description varchar(300)
);

create index EmpTicket on ticket(empid);
create index UserTicket on ticket(userid);

insert into user(username, userfname, userlname)
values('alley725', 'Andrew', 'Alley');

insert into employee(empusername,empfname,emplname)
values('drprof32', 'Patrick', 'Star');

insert into ticket(userid, empid, description)
values((select userid from user where username = 'alley725'), null, 'Test case');

create view viewTickets as
select ticketid, description, username, 
case
	when empusername is not null then 'Complete'
    else 'Incomplete'
end as status
from ticket t
left join user u on u.userid = t.userid
left join employee e on e.empid = t.empid;

select * from viewtickets