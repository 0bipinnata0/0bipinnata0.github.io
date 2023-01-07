%% MATLAB-二位平面淬火温度场模拟
clc
clearvars
close all

%% Material parameters
data_rho = [7830,0];       
data_Cp = [360.21,0.131];   
data_k = [7.33,0.019];    

%% Geometry
L = 0.1; 

%% Boundary conditions
T0 = 1040 + 273.15;      
Tinfinity = 20 + 273.15; 
h = 150;                
emissivity  = 0.24;      
time = 0;
%% Thermocouples position
px = [0.5 0.05 0.5 0.95 0.95 0.95 0.5 0.05 0.05]*L;
py = [0.5 0.05 0.05 0.05 0.5 0.95 0.95 0.95 0.5]*L;

%% Simulation control
n = 15; 
CFL = 0.3; 
itPlot = 10;  

%% Preparation
dx = L/(n-1);
x = 0:dx:L;
dy = L/(n-1);
y = 0:dy:L;
T = ones(n,n)*T0;
k0 = zeros(n,n);
Cp = zeros(n,n);
rho = zeros(n,n);
alpha = zeros(n,n);
Bi = zeros(n,n);
Br = zeros(n,n);
Fo = zeros(n,n);
T_new = zeros(n,n);
it = 0;   
x_old = T;
x_new = T;
ErrorMat = zeros(n,n);
tol = 1E-4;  
err = 1;

%% Plotting parameters
fsize = 16;

%% Save data
Thermocouples = length(px);
Vq = interp2(x,y,T,px,py);
Savedata = 1;
time_Vec(Savedata) = time;  
T_Matrix(Savedata,1:Thermocouples) = Vq;

%% Physical constants
stefan = 5.670367e-8; 

%% Initialisation  
figure('units','normalized','outerposition',[0 0 1 1])

while max(T) > 1.1*Tinfinity
%% Thermophysical properties
    
    for i = 1:n
        for j = 1:n
            k0(i,j) = data_k(1) + data_k(2)*T(i,j);
            Cp(i,j) = data_Cp(1) + data_Cp(2)*T(i,j);
            rho(i,j) = data_rho(1) + data_rho(2)*T(i,j);
            alpha(i,j)= k0(i,j)./rho(i,j)./Cp(i,j);
            Bi(i,j)= h*dx./k0(i,j);
            Br(i,j)= emissivity*stefan*dx./k0(i,j); 
        end
    end    
    
%% time step   
%% top left
    i=1;
    j=1;   

    dtVec(1) = CFL*dx*dx/2/(alpha(i,j)*(2+2*Bi(i,j)+2*Br(i,j)*T(i,j)^3));

%% top middle
    i=1;
    for j=2:n-1

        dtVec(2) = CFL*dx*dx/2/(alpha(1,j)*(2+Bi(1,j)+Br(1,j)*T(1,j)^3));
    end

%% top right
    i=1;
    j=n;

    dtVec(3) = CFL*dx*dx/2/(alpha(i,j)*(2+2*Bi(i,j)+2*Br(i,j)*T(i,j)^3));

%% middle left
    for i=2:n-1
        j=1;

        dtVec(4) = CFL*dx*dx/2/(alpha(1,j)*(2+Bi(1,j)+Br(1,j)*T(1,j)^3));
    end

%% middle center
    for i=2:n-1
        for j=2:n-1

            dtVec(5) = CFL*dx*dx/4/alpha(i,j);
        end
    end

%% middle right
    for i=2:n-1
        j=n;

        dtVec(6) = CFL*dx*dx/2/(alpha(1,j)*(2+Bi(1,j)+Br(1,j)*T(1,j)^3));
    end

%% btm left
    i=n;
    j=1;

    dtVec(7) = CFL*dx*dx/2/(alpha(i,j)*(2+2*Bi(i,j)+2*Br(i,j)*T(i,j)^3));

%% btm middle
    i=n;
    for j=2:n-1

        dtVec(8) = CFL*dx*dx/2/(alpha(1,j)*(2+Bi(1,j)+Br(1,j)*T(1,j)^3));
    end

%% btm right
    i=n;
    j=n;

    dtVec(9) = CFL*dx*dx/2/(alpha(i,j)*(2+2*Bi(i,j)+2*Br(i,j)*T(i,j)^3));
    
    dt = min(dtVec); 
    
%% Fourier number

    for i = 1:n
        for j = 1:n
            Fo(i,j)= dt*alpha(i,j)./(dx^2);
        end
    end
    
%% Construct the b matrix
%% top left
    b = T; 
    i=1;
    j=1;   

    b(i,j) = T(i,j)*(1-4*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Bi(i,j)+2*Br(i,j)*Tinfinity^3);

%% top middle
    i=1;
    for j=2:n-1

    b(i,j) = T(i,j)*(1-2*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Br(i,j)*Tinfinity^3);
    end

%% top right
    i=1;
    j=n;

    b(i,j) = T(i,j)*(1-4*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Bi(i,j)+2*Br(i,j)*Tinfinity^3);

%% middle left
    for i=2:n-1
        j=1;
        b(i,j) = T(i,j)*(1-2*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Br(i,j)*Tinfinity^3);
    end

%% middle center
    for i=2:n-1
        for j=2:n-1

            b(i,j) = T(i,j);
        end
    end

%% middle right
    for i=2:n-1
        j=n;

        b(i,j) = T(i,j)*(1-2*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Br(i,j)*Tinfinity^3);
    end

%% btm left
    i=n;
    j=1;

    b(i,j) = T(i,j)*(1-4*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Bi(i,j)+2*Br(i,j)*Tinfinity^3);

%% btm middle
    i=n;
    for j=2:n-1

        b(i,j) = T(i,j)*(1-2*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Br(i,j)*Tinfinity^3);
    end

%% btm right
    i=n;
    j=n;

    b(i,j) = T(i,j)*(1-4*Fo(i,j)*Br(i,j)*T(i,j)^3)+2*Fo(i,j)*Tinfinity*(Bi(i,j)+Bi(i,j)+2*Br(i,j)*Tinfinity^3);

%% Construct the A matrix
%% top left
 
    i=1;
    j=1;

    Aii = 1+4*Fo(i,j)+2*Fo(i,j)*(Bi(i,j)+Bi(i,j));
    A1(1) = -2*Fo(i+1,j)*T(i+1,j);
    A1(2) = -2*Fo(i,j+1)*T(i,j+1);
    T_new(1,1) = 1/Aii*(b(i,j) - sum(A1(1:2)));
          
%% top middle
    i=1;
    for j=2:n-1

        Aii = 1+4*Fo(i,j)+2*Bi(i,j)*Fo(i,j);
        A2(3) = -2*Fo(i+1,j)*T(i+1,j);
        A2(4) = -Fo(i,j-1)*T(i,j-1);
        A2(5) = -Fo(i,j+1)*T(i,j+1);
        T_new(1,j) = 1/Aii*(b(i,j) - sum(A2(3:5)));
    end

%% top right
    i=1;
    j=n;

    Aii = 1+4*Fo(i,j)+4*Bi(i,j)*Fo(i,j);
    A3(6) = -2*Fo(i+1,j)*T(i+1,j);
    A3(7) = -2*Fo(i,j-1)*T(i,j-1);
    T_new(1,j) = 1/Aii*(b(i,j) - sum(A3(6:7)));
        
%% middle left
    for i=2:n-1
        j=1;
        
        Aii = 1+4*Fo(i,j)+2*Bi(i,j)*Fo(i,j);
        A4(8) = -Fo(i+1,j)*T(i+1,j);
        A4(9) = -Fo(i-1,j)*T(i-1,j);
        A4(10) = -2*Fo(i,j+1)*T(i,j+1);
        T_new(2:n-1,1) = 1/Aii*(b(i,j) - sum(A4(8:10)));           
    end

%% middle center
    for i=2:n-1
        for j=2:n-1
           
            Aii = 1+4*Fo(i,j);
            A5(11) = -Fo(i+1,j)*T(i+1,j);
            A5(12) = -Fo(i-1,j)*T(i-1,j);
            A5(13) = -Fo(i,j+1)*T(i,j+1);
            A5(14) = -Fo(i,j-1)*T(i,j-1);
            T_new(2:n-1,2:n-1) = 1/Aii*(b(i,j) - sum(A5(11:14)));          
        end
    end

%% middle right
    for i=2:n-1
        j=n;

        Aii = 1+4*Fo(i,j)+2*Bi(i,j)*Fo(i,j);
        A6(15) = -Fo(i+1,j)*T(i+1,j);
        A6(16) = -2*Fo(i,j-1)*T(i,j-1);
        A6(17) = -Fo(i-1,j)*T(i-1,j);
        T_new(2:n-1,n) = 1/Aii*(b(i,j) - sum(A6(15:17)));
        
    end

%% btm left
    i=n;
    j=1;

    Aii = 1+4*Fo(i,j)+4*Bi(i,j)*Fo(i,j);
    A7(18) = -2*Fo(i-1,j)*T(i-1,j);
    A7(19) = -2*Fo(i,j+1)*T(i,j+1);
    T_new(n,1) = 1/Aii*(b(i,j) - sum(A7(18:19)));
        
%% btm middle
    i=n;
    for j=2:n-1

        Aii = 1+4*Fo(i,j)+2*Bi(i,j)*Fo(i,j);
        A8(20) = -Fo(i,j-1)*T(i,j-1);
        A8(21) = -2*Fo(i-1,j)*T(i-1,j);
        A8(22) = -Fo(i,j+1)*T(i,j+1);
        T_new(n,j) = 1/Aii*(b(i,j) - sum(A8(20:22)));

    end

%% btm right
    i=n;
    j=n;

    Aii = 1+4*Fo(i,j)+4*Bi(i,j)*Fo(i,j);
    A9(23) = -2*Fo(i-1,j)*T(i-1,j);
    A9(24) = -2*Fo(i,j-1)*T(i,j-1);
    T_new(n,n) = 1/Aii*(b(i,j) - sum(A9(23:24)));

%% Error calc       
    err = max(abs(x_new - x_old))./x_new; 
    x_old = x_new;
    
%% Update solution 
    T = T_new;
    time = time + dt;
    it = it + 1;
    Vq = interp2(x,y,T,px,py);
    Savedata = Savedata + 1;
    time_Vec(Savedata) = time;  
    T_Matrix(Savedata,1:Thermocouples) = Vq;
    
%% plot temperature
    figure(1)
    subplot(1,2,1)
    contourf(x,y,T)
    colorbar
    axis equal
    title('a) Temperature Destribution')
    xlabel('Distance (m)')
    ylabel('Distance (m)')
    hold on
    scatter(px,py,'kx');
    Vq = interp2(x,y,T,px,py);
    c = strsplit('ai1 ai2 ai3 ai4 ai5 ai6 ai7 ai8 ai9'); 
    dx0 = 0.003;
    dy0 = 0.001;
    text(px+dx0, py+dy0,c); 
    set(gca,'fontsize',fsize) 
    hold off  

    subplot(1,2,2)
    plot(time_Vec,T_Matrix,'k','linewidth',0.5)
    xlabel('Time (s)')
    ylabel('Temperature (^oC)')
    xlim([0 time_Vec(end)]) 
    title(['b) ai1 ~ ai9 Temperature Field',' (time = ',num2str(time),'s)'])
    set(gca,'fontsize',fsize) 

    pause(0.0001)

end

    for i = 1:length(px)
        fname = ['ai',num2str(i),'.txt']; 
        fileID=fopen(fname,'w');
        for j = 1: Savedata 
            fprintf(fileID,'%e\t%e\n',time_Vec(j),T_Matrix(j,i));  
        end
        fclose(fileID);  
    end

%% --by 王鑫    
  