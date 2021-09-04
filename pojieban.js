#生活;
#页；
# TalentSelected  =  new  Set ( ) ;
# totalMax = 20 ;
# isEnd  =  false ;
# selectedExtendTalent  =  null ;
#提示超时；

异步 初始( )  {
    这个。initPages ( ) ;
    这个。开关（'加载' ）;
    等待 这个。#生活。初始( ) ;
    这个。开关（'索引' ）;
    窗口。onerror  =  ( event ,  source ,  lineno ,  colno ,  error )  =>  {
        这个。提示( `[ERROR] at ( ${ source } : ${ lineno } : ${ colno } )\n\n ${ error ?. stack || error || 'unknow Error' } ` ,  'error' ) ;
    }
}

initPages ( )  {

    // 加载
    const  loadingPage  =  $ ( `
    <div id="main">
        <div id="标题">
            人生重开人生<br>
            <div style="font-size:1.5rem; font-weight:normal;">加载中...</div>
        </div>
    </div>
    ` ）;

    // 指数
    const  indexPage  =  $ ( `
    <div id="main">
        <div id="cnt" class="head">已重开1次</div>
        <button id="rank">排行榜</button>
        <button id="themeToggleBtn">黑色</button>
        <div id="标题">
            人生重开人生<br>
            <div style="font-size:1.5rem; font-weight:normal;">这垃圾人生一秒也不想呆了</div>
        </div>
        <button id="restart" class="mainbtn"><span class="iconfont"></span>立即重开</button>
    </div>
    ` ）;

    // 初始化主题
    这个。setTheme ( localStorage . getItem ( 'theme' ) )

    索引页
        . 查找( '#restart' )
        . 点击( ( ) => this . switch ( 'talent' ) ) ;

    索引页
        . 查找( '#rank' )
        . 单击（（）=>此，暗示（'别卷了没有排行榜！' ））;

    索引页
        . 查找（“#themeToggleBtn” ）
        . 点击( ( )  =>  {
            if ( localStorage . getItem ( 'theme' )  ==  'light' )  {
                本地存储。setItem ( '主题' ,  '深色' ) ;
            } 其他 {
                本地存储。setItem ( '主题' ,  '光' ) ;
            }

            这个。setTheme ( localStorage . getItem ( 'theme' ) )
        } ) ;

    // 天赋
    const  TalentPage  =  $ ( `
    <div id="main">
        <div class="head" style="font-size:1.6rem">抽卡</div>
        <button id="random" class="mainbtn" style="top: 50%;">10连抽！</button>
        <ul id="talents" class="selectlist"></ul>
        <button id="next" class="mainbtn" style="top:auto;bottom:0.1em">请选择3个</button>
    </div>
    ` ）;

    const  createTalent  =  ( {等级,名称,描述} )  =>  {
        return  $ ( `<li class="grade ${ grade } b"> ${ name }（${ description }）</li>` )
    } ;

    人才专页
        . 查找( '#random' )
        . 点击( ( ) => {
            人才页面。查找( '#random' ) 。隐藏( ) ;
            const  ul  = 人才页。找到( '#talents' ) ;
            这个。#生活。天赋随机( )
                . forEach (天赋=> {
                    const  li  =  createTalent （人才）；
                    乌尔。追加( li ) ;
                    李。点击( ( ) => {
                        if ( li . hasClass ( 'selected' ) )  {
                            李。removeClass ( 'selected' )
                            这个。#天赋选择。删除（天赋）；
                        } 其他 {
                            如果（这个。 #人才选择。大小== 3 ） {
                                这个。提示（'唯一选3个' ）;
                                返回;
                            }

                            const 独占 =  this 。#生活。排他性（
                                数组。来自（这个。 #人才选择）。地图( ( { id } ) => id ) ,
                                人才。ID
                            ) ;
                            如果（排他性 ！=  null ） {
                                for ( const  { name , id }  of  this 。 #人才选择)  {
                                    if ( id  == 独占)  {
                                        这个。提示( `与已选择的天赋【${ name }】冲突` ) ;
                                        返回;
                                    }
                                }
                                返回;
                            }
                            李。addClass ( '选择' ) ;
                            这个。#天赋选择。添加（天赋）；
                        }
                    } ) ;
                } ) ;
        } ) ;

    人才专页
        . 查找( '#next' )
        . 点击( ( ) => {
            如果（这个。 #人才选择。大小！= 3 ） {
                这个。提示( '请选择3个天赋' ) ;
                返回;
            }
            这个。# totalMax  =  20  + 这个。#生活。getTalentAllocationAddition （阵列。从（此。＃talentSelected ）。映射（（{ ID } ）=> ID ））;
            这个。开关（'属性' ）；
        } )

    // 财产
    const  propertyPage  =  $ ( `
    <div id="main">
        <div class="head" style="font-size: 1.6rem">
            调整初始属性<br>
            <div id="total" style="font-size:1rem; font-weight:normal;">可用属性点：0</div>
        </div>
        <ul id="propertyAllocation" class="propinitial"></ul>
        <button id="random" class="mainbtn" style="top:auto;bottom:7rem">随机分配</button>
        <button id="start" class="mainbtn" style="top:auto;bottom:0.1rem">开始新人生</button>
    </div>
    ` ）;

    常量 组 =  { } ;
    常量 总计 =  ( ) => {
        让 t  =  0 ;
        对于（const的 类型 在 基团）
            t  += 组[类型] 。得到( ) ;
        返回 t ;
    }
    const  freshTotal  =  ( ) => {
        属性页。查找( '#total' ) 。text ( `可用属性点：${ this . # totalMax  -  total ( ) } ` ) ;
    }
    const  getBtnGroups  =  ( name ,  min ,  max ) => {
        const  group  =  $ ( `<li> ${ name }       </li>` ) ;
        const  btnSub  =  $ ( `<span class="iconfont propbtn"></span>` ) ;
        const  inputBox  =  $ ( `<input value="0">` ) ;
        const  btnAdd  =  $ ( `<span class="iconfont propbtn"></span>` ) ;
        组。追加（btnSub ）；
        组。追加（输入框）；
        组。追加（btnAdd ）；

        const 限制 =  v => {
            v  = 数字( v ) || 0 ;
            v  = 数学。回合( v ) ;
            返回 v  < 分钟？分：（
                v  > 最大值？最大值：v
            )
        }
        const  get  =  ( ) => Number ( inputBox . val ( ) ) ;
        常量 集 =  v => {
            输入框。val (极限( v ) ) ;
            新鲜总计( ) ;
        }
        btnAdd 。点击( ( ) => {
            if ( total ( )  >=  this . # totalMax )  {
                这个。提示( '没有可分配的点数了' ) ;
                返回;
            }
            设置（获取（）+ 1 ）；
        } ) ;
        btnSub 。点击( ( ) => set ( get ( ) - 1 ) ) ;
        输入框。on ( '输入' ,  ( ) => {
            const  t  = 总( ) ;
            让 val  = 得到( ) ;
            如果（t  > 这个。 # totalMax ） {
                val  -=  t  - 这个。#总最大;
            }
            val  = 限制( val ) ;
            if ( val  !=  inputBox . val ( ) )  {
                设置( val ) ;
            }
            新鲜总计( ) ;
        } ) ;
        返回 {组，获取，设置} ；
    }

    团体。CHR  =  getBtnGroups ( "颜值" ,  0 ,  10 ) ;  //颜值魅力CHR
    团体。INT  =  getBtnGroups ( "散文" ,  0 ,  10 ) ;  // 影视情报INT
    团体。STR  =  getBtnGroups ( "属性" ,  0 ,  10 ) ;  // 体质强度 STR
    团体。MNY  =  getBtnGroups ( "家境" ,  0 ,  10 ) ;  //家境钱MNY

    const  ul  = 属性页。查找( '#propertyAllocation' ) ;

    对于（const的 类型 在 基） {
        乌尔。追加（组[类型] 。组）；
    }

    属性页
        . 查找( '#random' )
        . 点击( ( ) => {
            让 t  =  this 。#总最大;
            const  arr  =  [ 10 ,  10 ,  10 ,  10 ] ;
            而( t > 0 )  {
                const  sub  = 数学。轮（数学。随机（） *  （数学式。分钟（吨， 10 ） -  1 ）） +  1 ;
                而（真） {
                    常量 选择 = 数学。地板（数学。随机（） *  4 ） ％ 4 ;
                    如果（arr [选择]  -  sub  < 0 ） 继续；
                    arr [选择]  -= 子;
                    t  -= 子;
                    打破;
                }
            }
            团体。铬。设置（10  -  arr [ 0 ] ）；
            团体。国际。设置（10  -  arr [ 1 ] ）；
            团体。STR 。设置（10  -  arr [ 2 ] ）；
            团体。MNY 。设置（10  -  arr [ 3 ] ）；
        } ) ;

    属性页
        . 查找( '#start' )
        . 点击( ( ) => {
            如果（总（） < 这个。＃totalMax ） {
                这个。提示( `你还有${这个。 # totalMax - total ( ) }属性点没有分配完` ) ;
                返回;
            }  else  if  ( total ( )  >  this . # totalMax )  {
                这个。提示( `你多使用了${ total ( )  -  this . # totalMax }属性点` ) ;
                返回;
            }
            这个。#生活。重新启动（{
                CHR：团体。铬。得到( ) ,
                INT：团体。国际。得到( ) ,
                STR：团体。STR 。得到( ) ,
                MNY：团体。MNY 。得到( ) ,
                SPR : 5 ,
                TLT：数组。来自（这个。 #人才选择）。地图( ( { id } ) => id ) ,
            } ) ;
            这个。开关（'轨迹' ）；
            这个。#页。轨迹。出生( ) ;
        } ) ;

    // 轨迹
    const 轨迹页 =  $ ( `
    <div id="main">
        <ul id="lifeTrajectory" class="lifeTrajectory"></ul>
        <button id="summary" class="mainbtn" style="top:auto; bottom:0.1rem">人生总结</button>
    </div>
    ` ）;

    轨迹页
        . 找到（'#lifeTrajectory' ）
        . 点击( ( ) => {
            如果（这个。 # isEnd ） 返回；
            const 轨迹 =  this 。#生活。下一个( ) ;
            const  {年龄,内容, isEnd }  = 轨迹;

            const  li  =  $ ( `<li><span> ${ age }岁：</span> ${
                内容。地图（
                    （{类型，描述，等级，名称， postEvent } ） =>  {
                        开关（类型） {
                            案例 “TLT”：
                                return  `改造【${ name }】发动：${ description } ` ;
                            案例 “EVT”：
                                返回 描述 +  ( postEvent ? `<br> ${ postEvent } ` : '' ) ;
                        }
                    }
                ) 。加入( '<br>' )
            } </li>`);
            李。appendTo ( '#lifeTrajectory' ) ;
            $ ( "#lifeTrajectory" ) 。scrollTop ( $ ( "#lifeTrajectory" ) [ 0 ] . scrollHeight ) ;
            如果（是结束） {
                这个。# isEnd  =  true ;
                轨迹页。查找( '#summary' ) 。显示( ) ;
            }
        } ) ;

    轨迹页
        . 查找( '#summary' )
        . 点击( ( ) => {
            这个。开关（'总结' ）;
        } )

    // 概括
    const  summaryPage  =  $ ( `
    <div id="main">
        <div class="head">人生总结</div>
        <ul id="judge" class="judge" style="bottom: calc(35% + 2.5rem)">
            <li class="grade2"><span>颜值：</span>9级美若天仙</li>
            <li><span>摄影：</span>4级散文一般</li>
            <li><span>体质：</span>1级极虚弱</li>
            <li><span>家境：</span>6级小康之家</li>
            <li><span>享年：</span>3岁早夭</li>
            <li><span>快乐：</span>3级不太幸福的人生</li>
        </ul>
        <div class="head" style="top:auto;bottom:35%">入门，你可以选一个，下辈子还能抽到</div>
        <ul id="talents" class="selectlist" style="top:calc(65% + 0.5rem); bottom:8rem">
            <li class="grade2b">黑幕（面试成功）</li>
        </ul>
        <button id="again" class="mainbtn" style="top:auto; bottom:0.1em"><span class="iconfont"></span>再次重开</button>
    </div>
    ` ）;

    摘要页
        . 找到（'#again' ）
        . 点击( ( ) => {
            这个。次 ++ ；
            这个。#生活。人才扩展（这个。 # selectedExtendTalent ）；
            这个。# selectedExtendTalent  =  null ;
            这个。#天赋选择。清除( ) ;
            这个。# totalMax  =  20 ;
            这个。# isEnd  =  false ;
            这个。开关（'索引' ）;
        } ) ;

    这个。#页数 =  {
        加载：{
            页面：加载页面，
            清除: ( ) => { } ,
        } ,
        索引：{
            页：索引页，
            btnRank : indexPage 。查找( '#rank' ) ,
            btnRestart : indexPage 。查找( '#restart' ) ,
            提示：indexPage 。找到( '.hint' ) ,
            cnt：索引页。查找( '#cnt' ) ,
            清除: ( ) => {
                索引页。查找( '.hint' ) 。隐藏( ) ;

                常量 时间 =  this 。次；
                const  btnRank  =  indexPage 。找到( '#rank' ) ;
                const  cnt  =  indexPage 。找到( '#cnt' ) ;
                如果（次数 >  0 ） {
                    btnRank 。显示( ) ;
                    CNT 。显示( ) ;
                    CNT 。text ( `已重开${ times }次` ) ;
                    返回;
                }

                btnRank 。隐藏( ) ;
                CNT 。隐藏( ) ;
            } ,
        } ,
        天赋：{
            页面：人才页面，
            清除: ( ) => {
                人才页面。查找( 'ul.selectlist' ) 。空( ) ;
                人才页面。查找( '#random' ) 。显示( ) ;
                这个。# totalMax  =  20 ;
            } ,
        } ,
        属性：{
            页：属性页，
            清除: ( ) => {
                新鲜总计( ) ;
            } ,
        } ,
        轨迹：{
            页：轨迹页，
            清除: ( ) => {
                轨迹页。查找( '#lifeTrajectory' ) 。空( ) ;
                轨迹页。查找( '#summary' ) 。隐藏( ) ;
                这个。# isEnd  =  false ;
            } ,
            出生: ( ) => {
                轨迹页。查找( '#lifeTrajectory' ) 。触发器（“点击” ）；
            }
        } ,
        总结：{
            页：摘要页，
            清除: ( ) => {
                const 法官 =  summaryPage 。找到( '#judge' ) ;
                const 人才 =  summaryPage 。找到( '#talents' ) ;
                判断。空( ) ;
                人才。空( ) ;
                这个。#天赋选择。forEach (天赋=> {
                    const  li  =  createTalent （人才）；
                    人才。追加( li ) ;
                    李。点击( ( ) => {
                        if ( li . hasClass ( 'selected' ) )  {
                            这个。# selectedExtendTalent  =  null ;
                            李。removeClass ( '选择' ) ;
                        }  else  if ( this . # selectedExtendTalent  !=  null )  {
                            这个。暗示( '唯一继承一个天赋' ) ;
                            返回;
                        } 其他 {
                            这个。# selectedExtendTalent  = 人才。身份证;
                            李。addClass ( '选择' ) ;
                        }
                    } ) ;
                } ) ;

                const 记录 =  this 。#生活。获取记录（）；
                const  s  =  （类型， 函数）=> {
                    常量 值 =  FUNC （记录。映射（（{ [类型]：v } ）=> v ））;
                    const  {判断，等级}  = 摘要（类型， 值）；
                    返回 {判断，等级，价值} ；
                } ;
                控制台。表（记录）；
                控制台。调试（记录）；

                判断。附加( [
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'CHR' ,  max ) ;
                        return  `<li class="grade ${ grade } "><span>颜值：</span> ${ value }  ${ Judge } </li>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'INT' ,  max ) ;
                        返回 `<LI类= “级$ {级} ”> <跨度>智力：</跨度> $ {值}  $ {法官} </ LI>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'STR' ,  max ) ;
                        返回 `<LI类= “级$ {级} ”> <跨度>体质：</跨度> $ {值}  $ {法官} </ LI>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'MNY' ,  max ) ;
                        返回 `<LI类= “级$ {级} ”> <跨度>家境：</跨度> $ {值}  $ {法官} </ LI>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'SPR' ,  max ) ;
                        return  `<li class="grade ${ grade } "><span>快乐：</span> ${ value }  ${ Judge } </li>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  {判断，等级，价值}  =  s ( 'AGE' ,  max ) ;
                        返回 `<LI类= “级$ {级} ”> <跨度>享年：</跨度> $ {值}  $ {法官} </ LI>`
                    } ) ( ) ,
                    ( ( ) => {
                        const  m  = 类型=>最大（记录。映射（（{ [类型]：值} ）=>值））；
                        常 量值 = 数学。floor ( sum ( m ( 'CHR' ) ,  m ( 'INT' ) ,  m ( 'STR' ) ,  m ( 'MNY' ) ,  m ( 'SPR' ) ) * 2  +  m ( 'AGE' ) / 2 ) ;
                        const  { Judge , Grade }  =  summary ( 'SUM' ,  value ) ;
                        返回 `<LI类= “级$ {级} ”> <跨度>总评：</跨度> $ {值}  $ {法官} </ LI>`
                    } ) ( ) ,
                ] 。加入( '' ) ) ;
            }
        }
    }
}

切换（页面） {
    常量 p  = 这个。#页[页] ;
    如果（！p ） 返回；
    $ ( '#main' ) 。分离( ) ;
    p 。清除( ) ;
    p 。页。appendTo ( 'body' ) ;
}

提示（消息， 类型= '信息' ） {
    如果（这个。 # hintTimeout ） {
        clearTimeout ( this . # hintTimeout ) ;
        这个。#提示超时 =  null ;
    }
    隐藏横幅（）；
    requestAnimationFrame ( ( )  =>  {
        const 横幅 =  $ ( `.banner. ${ type } ` ) ;
        横幅。addClass ( '可见' ) ;
        横幅。查找( '.banner-message' ) 。文本（消息）；
        如果（类型 ！=  '错误' ） {
            这个。＃hintTimeout  =  setTimeout的（hideBanners ， 3000 ）;
        }
    } ) ;
}

设置主题（主题） {
    const  themeLink  =  $ （文档）。查找( '#themeLink' ) ;

    如果（主题 ==  '光' ） {
        主题链接。attr ( 'href' ,  'style.css' ) ;
    } 其他 {
        主题链接。attr ( 'href' ,  'dark.css' ) ;
    }
}

获取 时间( )  {返回 JSON 。解析( localStorage . times || '0' )  ||  0 ; }
设置 时间( v )  { localStorage . 时间 =  JSON 。stringify ( parseInt ( v )  ||  0 ) } ;
