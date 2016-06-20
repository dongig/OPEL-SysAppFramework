#include<zlib.h>
#include<zconf.h>
#include<stdio.h>
#define BUF_MAX  1024

void i_uncompress(char *oriFile)
{
    char destFile[FILENAME_MAX], buf[BUF_MAX];
    gzFile pOriFile;
    FILE* pDestFile;
    int curRead=0, totalRead=0;
					 
					       
    // 압축이 풀린 후의  파일 이름
    int oriNameLength = strlen(oriFile) - 3;
						 
    strncpy(destFile, oriFile, oriNameLength);
    destFile[oriNameLength] = '\0';
    printf("filename =   %s\n", destFile);
									 
									 
									    // 압축이 풀릴 파일 오픈    
									    if((pDestFile = fopen(destFile, "wb")) == NULL ){
											        printf("dest file open Error! \n");
													        exit(0);;
															    }
										 
										    // 압축 파일 오픈
										    if ((pOriFile = gzopen(oriFile, "rb")) == NULL){
												        printf("original file open Error! \n");
														        exit(0);
																    }
											    
			    while( curRead = gzread(pOriFile, buf, BUF_MAX) )
													    {
	        if ( fwrite(buf , sizeof(char), curRead, pDestFile) < 0 ){
																		 
																		            gzclose(pOriFile);
																					            fclose(pDestFile);
																								 
																								            exit(0);
																											        }
																	 
																	        //printf("%d ", strlen(buf));
																	        totalRead += curRead;
																			    }
												    
												    //printf("total = %d\n", totalRead);
												    printf("압축 풀기 성공 : %s => %s\n", oriFile, destFile);
													 
													    gzclose(pOriFile);
														    fclose(pDestFile);
}

int main(){


}
